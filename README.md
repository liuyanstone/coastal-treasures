# Coastal Treasures / 海岸拾趣
Original bilingual beach memory game, built for GitHub Pages without dependencies, accounts or installation. Original SVG artwork; inspired by the general memory-selection genre, not a reproduction of proprietary game assets or specifications.

Each device-local day generates exactly two shores in a random order: Sunlit Cove and Twilight Shore. Each has 64 identifiable designs across 16 families: shells, seaweed, coral, fish, crabs, turtles, pebbles and beach toys. The two shores use distinct palettes, outlines and shore designs. Each design keeps its identity when moved or rotated. Memory resets between shores.

Each new design is worth 100 points. Selecting a previously collected design ends that shore immediately. Completing all 64 designs also ends a shore successfully. The two shore scores make the daily total. Start with 12 objects; after 7 unique finds show 15, after 14 show 18. Objects replenish from both seen and unseen designs and scatter into new non-overlapping slots after each valid pick. The last two picked designs are excluded from replenishment. At least one unseen design remains available while a shore is active. Objects on the same screen never duplicate each other. There is no timer.

Daily state, sound preference and up to 90 completed daily summaries are saved in localStorage (`coastal-treasures-v1`). Language is `coastal-treasures-language`. Refresh restores progress; finishing both shores does not grant a new daily attempt. A new local calendar date creates two new shores. No server identity or cross-device sync.

Use touch/click to collect. Tab or arrow keys navigate objects; Enter/Space collects. Review your collection after a shore ends; no picked-object markers or lists are shown during play.

Serve as static files. Entry index.html. `node check.mjs` verifies daily transitions, scoring, duplicate failure, guaranteed unseen choices, deterministic seeded generation, restore validation and art/text coverage.
