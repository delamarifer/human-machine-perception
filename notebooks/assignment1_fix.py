# Assignment 1: load open models and run them without losing work.
# This code is part of the helper cell in the starter notebook. If you saved your copy before Nov 8, a new cell
# right after the helper cell can bring it up to date (see the assignment page).
import gc, hashlib, json, os, re, time
import pandas as pd
import torch

_open = {}   # the one open model in memory: two at a time do not fit on Colab's free GPU

def free_model():
    """Takes the open model out of memory."""
    _open.clear()
    gc.collect()
    if torch.cuda.is_available():
        torch.cuda.empty_cache()

def _load(model_id):
    if _open.get("id") == model_id:
        return
    free_model()
    from transformers import AutoModelForImageTextToText, AutoProcessor
    token, t0 = secret("HF_TOKEN"), time.time()
    processor = AutoProcessor.from_pretrained(model_id, token=token)
    if torch.cuda.is_available():
        # float16 on GPUs without built-in bfloat16, like Colab's free T4. Straight to the GPU, so it fits in RAM.
        dtype = torch.bfloat16 if torch.cuda.is_bf16_supported(including_emulation=False) else torch.float16
        model = AutoModelForImageTextToText.from_pretrained(model_id, token=token, dtype=dtype, device_map="cuda")
    else:
        model = AutoModelForImageTextToText.from_pretrained(model_id, token=token, dtype=torch.float32)
    _open.update(id=model_id, processor=processor, model=model.eval())
    print(f"Loaded {model_id} in {time.time() - t0:.0f} s")

def load_open_model(model_id):
    """An open vision-language model from Hugging Face. Returns ask(image, prompt) -> the model's reply.
    Only one model is in memory at a time: asking a different one swaps it in."""
    _load(model_id)

    def ask(image, prompt, max_new_tokens=256):   # room to reason before answering, as some models do
        _load(model_id)
        processor, model = _open["processor"], _open["model"]
        messages = [{"role": "user", "content": [{"type": "image", "image": _prepare(image)},
                                                 {"type": "text", "text": prompt}]}]
        inputs = processor.apply_chat_template(messages, add_generation_prompt=True, tokenize=True,
                                               return_dict=True, return_tensors="pt").to(model.device)
        with torch.inference_mode():
            out = model.generate(**inputs, max_new_tokens=max_new_tokens, do_sample=False)
        return processor.decode(out[0, inputs["input_ids"].shape[1]:], skip_special_tokens=True).strip()

    ask.name = model_id
    return ask

def _save_folder():
    folder = "/content/drive/MyDrive/assignment1-answers" if os.path.isdir("/content/drive/MyDrive") else "answers"
    os.makedirs(folder, exist_ok=True)
    return folder

def _key(item):
    h = hashlib.md5(item["image"].convert("RGB").tobytes())
    h.update(str(item["prompt"]).encode())
    return h.hexdigest()

def _plain(x):
    return x.item() if hasattr(x, "item") else str(x)

def run(ask, items, label=""):
    """Asks the model every item (dicts with image, prompt, task, groundtruth). Returns a table, one row per item.
    Every answer is saved as it comes. If the run stops, run the cell again: it continues where it stopped."""
    name = getattr(ask, "name", None) or label or "model"
    path = os.path.join(_save_folder(), re.sub(r"[^\w.-]+", "_", name) + ".jsonl")
    saved = {}
    if os.path.exists(path):
        with open(path) as f:
            for line in f:
                try:
                    row = json.loads(line)
                except ValueError:      # a line cut off by a crash
                    continue
                if not str(row["reply"]).startswith("ERROR"):
                    saved[row["key"]] = row
    keys = [_key(item) for item in items]
    todo = sum(k not in saved for k in keys)
    if todo < len(items):
        print(f"{label or name}: {len(items) - todo} answers already saved, {todo} to go.")

    rows, new, failed, in_a_row, t0 = [], 0, 0, 0, time.time()
    with open(path, "a") as f:
        for item, key in zip(items, keys):
            if key in saved:
                rows.append(saved[key])
                continue
            try:
                reply = ask(item["image"], item["prompt"])
            except Exception as err:
                reply = f"ERROR: {type(err).__name__}: {err}"
                gc.collect()
                if torch.cuda.is_available():
                    torch.cuda.empty_cache()
            bad = reply.startswith("ERROR")
            row = {**{c: item.get(c) for c in ("row", "task", "groundtruth", "level", "prompt")}, "key": key, "reply": reply,
                   "answer": None if bad else parse(item["task"], reply),
                   "correct": False if bad else is_correct(item["task"], reply, item["groundtruth"])}
            f.write(json.dumps(row, default=_plain) + "\n")
            f.flush()
            rows.append(row)
            new += 1
            failed += bad
            in_a_row = in_a_row + 1 if bad else 0
            if in_a_row == 3:
                raise RuntimeError(f"Stopped after 3 errors in a row. The last one: {reply[:300]}\nYour answers so far are "
                                   "saved. Try Runtime -> Restart session, then run the cells again; if it happens again, "
                                   "use the smaller model, Qwen/Qwen3-VL-2B-Instruct.")
            if new % 20 == 0 or new == todo:
                spent = time.time() - t0
                print(f"{label or name} {new}/{todo} done, {spent / 60:.1f} min so far, "
                      f"about {spent / new * (todo - new) / 60:.1f} min left")
    if failed:
        print(f"{failed} images failed and count as wrong. Run this cell again to retry them.")
    return pd.DataFrame(rows).drop(columns="key")
