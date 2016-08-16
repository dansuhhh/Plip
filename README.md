# Plip

Plip is a single-player, Pong-like game in which the player juggles balls as they bounce by and increase in number.

## Tech
Plip will implement HTML, CSS, JavaScript, and jQuery as well as the following tools:

  * the `keymaster` library to register key strokes
  * the `Canvas` API for visual rendering
  * the `Web Audio` API for audio rendering

## Features
- [ ] game menu page
- [ ] falling balls with random velocity, affected by a universal gravity constant
- [ ] increasing amount of balls to juggle (difficulty)
- [ ] random color generation for each ball
- [ ] player is allowed 3 lives/chances per game
- [ ] rising score for each ball bounce
- [ ] sounds for ball bouncing, losing a life, game over
- [ ] game over page
- [ ] player allowed to enter name in leaderboard (*bonus*)
- [ ] power ups (*bonus*)

## Possible challenges
The possibility of more than one ball colliding with the floor at a specific time is unfairly possible. Before a ball is rendered, an algorithm `hasUniqueFall` must be called to filter out this possibility.

## Timeline

### Phase 1 (Day 1):
- [ ] Gravity and movement of a ball
- [ ] Random color generation for ball
- [ ] Player paddle (`keymaster`)

### Phase 2 (Day 2):
- [ ] Increasing number of balls
- [ ] `hasUniqueFall`
- [ ] score
- [ ] audio for ball bounce, game over
- [ ] powerups (*bonus*)

### Phase 3 (Day 3):
- [ ] Create gamepage design/base canvas
- [ ] Start/End menu
- [ ] Leaderboard (*bonus*)















<!-- -->
