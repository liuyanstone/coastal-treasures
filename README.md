# Coastal Treasures / 海岸拾趣
Original bilingual beach memory game, built for GitHub Pages without dependencies, accounts or installation. Original SVG artwork; inspired by the general memory-selection genre, not a reproduction of proprietary game assets or specifications.

Choose either shore for a fresh random game each time: Sunlit Cove and Twilight Shore. Each has 64 identifiable designs across 16 families: shells, seaweed, coral, fish, crabs, turtles, pebbles and beach toys. The two shores use distinct palettes, outlines and shore designs. Each design keeps its identity when moved or rotated. Memory resets between shores.

Each new design is worth 100 points. Selecting a previously collected design ends that shore immediately. Completing all 64 designs also ends a shore successfully. The highest completed score on each shore each day is retained; the two daily bests make the daily total. Repeat games never add points cumulatively. Start with 12 objects; after 7 unique finds show 15, after 14 show 18. Objects replenish from both seen and unseen designs and scatter into new non-overlapping slots after each valid pick. The last two picked designs are excluded from replenishment. At least one unseen design remains available while a shore is active. Objects on the same screen never duplicate each other. There is no timer.

Daily state, sound preference and up to 90 completed daily summaries are saved in localStorage (`coastal-treasures-v1`). Language is `coastal-treasures-language`. Refresh restores progress. Return to shore selection anytime to resume the current unfinished game or explicitly choose a shore for a new random game. After a game ends, replay that shore or choose either shore. A new local calendar date resets daily bests. Version 1 progress and scores migrate to version 2 without clearing saved totals. No server identity or cross-device sync.

Use touch/click to collect. Tab or arrow keys navigate objects; Enter/Space collects. Review your collection after a shore ends; no picked-object markers or lists are shown during play.

Serve as static files. Entry index.html. `node check.mjs` verifies daily transitions, scoring, duplicate failure, guaranteed unseen choices, deterministic seeded generation, restore validation and art/text coverage.
