# Little Treasures / 拾光小天地
An original bilingual object-memory game for GitHub Pages. The existing `coastal-treasures` URL, storage key and language key remain valid after the rename.

Choose either scene for a fresh random game:
- **Sunlit Cove / 晴沙海湾** has 64 seaside designs across 16 shell, sea life and beach-toy families.
- **Spring Garden / 春日花园** has 64 garden-only designs across 16 flower, plant and land-toy families: tulip, daisy, rose, sunflower, lavender, lily, cactus, clover, teddy bear, kite, pinwheel, train, building blocks, yo-yo, robot and balloon.

The two catalogs share no object IDs or families. Garden has original SVG illustrations and a grassy, spring-colored landscape; it replaces Twilight Shore. Every scene offers 64 visually distinct designs (some intentionally similar).

Each new design earns 100 points. Picking a design twice ends the game; collecting all 64 ends it successfully. Items replenish and scatter after each new find. Start with 12 visible objects, increasing to 15 after 7 finds and 18 after 14. No two visible objects have the same ID; at least one unseen choice remains available. No timer. Memory resets each new game.

Choose either scene at any time for a new random game, or resume the current unfinished game from the selector. Repeat play retains only the highest completed score per scene per local calendar day. The sum of those two bests is the daily total.

State version 3 uses the original localStorage keys `coastal-treasures-v1` and `coastal-treasures-language`, with up to 90 completed daily summaries. Version 1/2 saves migrate: Sunlit Cove progress is unchanged; former Twilight Shore best scores carry to Spring Garden, whose replaced object collection starts fresh. Unfinished old shore games return to selection with a visible explanation. History, language and sound preference remain intact. No login, server identity or external dependencies.

Serve as static files. Entry: index.html. Engine: engine.mjs. Artwork: art.mjs and garden-art.mjs. Run `node check.mjs` to verify independent catalogs, unique artwork, full runs, duplicate failures, scoring, resume, old-save migration and bilingual content. Migration fixtures are generated game states, not user data.
