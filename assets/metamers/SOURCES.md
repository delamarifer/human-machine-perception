# Metamers primer: sources

- `coffee.jpg`: "Warm cup of coffee on a table at a cafe" by Shixart1985, CC BY 2.0,
  https://commons.wikimedia.org/wiki/File:Warm_cup_of_coffee_on_a_table_at_a_cafe.jpg
  (the Day 2 crop, `day02/assets/one-photo/crop.jpg`, resized to 320 px).
- `coffee-pixels.jpg`, `coffee-spectrum.jpg`: made from `coffee.jpg` by `make_figures.py` (random seed 0).
- `cones.json`: Stockman & Sharpe (2000) 2-degree cone fundamentals, linear energy, 5 nm steps, 390-780 nm,
  from http://www.cvrl.org/database/data/cones/linss2_10e_5.csv (downloaded 2026-11-02).

Regenerate (numpy, Pillow): `python make_figures.py ../../day02/assets/one-photo/crop.jpg linss2_10e_5.csv`
