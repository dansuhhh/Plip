# Plips

Plips is a single-player, Pong-like game in which the player juggles balls as they bounce by and increase in number.

## Tech
Plips will implement HTML, CSS, JavaScript, and jQuery as well as the following tools:

  * the `keymaster` library to register key strokes
  * the `Canvas` API for visual rendering
  * the `Web Audio` API for audio rendering

## Features
- [X] game menu page
- [X] falling balls with random velocity, affected by a universal gravity constant
- [X] increasing amount of balls to juggle (difficulty)
- [X] random color generation for each ball
- [X] player is allowed 3 lives/chances per game
- [X] rising score for each ball bounce
- [ ] sounds for ball bouncing, losing a life, game over
- [X] game over page
- [ ] player allowed to enter name in leaderboard (*bonus*)
- [ ] power ups (*bonus*)

## Possible challenges
The possibility of more than one ball colliding with the floor at a specific time is unfairly possible. Before a ball is rendered, an algorithm `hasUniqueFall` must be called to filter out this possibility.

## Timeline

### Phase 1 (Day 1):
- [X] Gravity and movement of a ball
- [X] Random color generation for ball
- [X] Player paddle (`keymaster`)

### Phase 2 (Day 2):
- [X] Increasing number of balls
- [X] `hasUniqueFall`
- [X] score
- [ ] audio for ball bounce, game over
- [ ] powerups (*bonus*)

### Phase 3 (Day 3):
- [X] Create gamepage design/base canvas
- [X] Start/End menu
- [ ] Leaderboard (*bonus*)















<!-- -->
