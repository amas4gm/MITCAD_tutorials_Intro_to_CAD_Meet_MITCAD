# Intro to CAD · Meet MITCAD

A native in-app tutorial for MITCAD 0.71.0 and later. Start in the Design workspace and build a 30 × 30 × 30 mm cube with a Ø10 mm hole through one side. The lesson introduces the viewport, workspace selector, Browser, Timeline, sketch planes, constraints, profiles, and Extrude.

## Run locally

1. Initialize and commit this folder as a Git repository if you received it as an archive.
2. Open MITCAD. From the Start page, choose **Help → Tutorials → Add Source** and add the repository folder. Select **Intro to CAD: Meet MITCAD** and open it.
3. Open **Listen to the welcome** for the optional ElevenLabs narration. Select **Start lesson** to enable the native guide.

The package uses relative local assets. It makes no network requests while the lesson runs. The welcome has a transcript, feedback sounds can be muted, and the page announces progress and wrong-command feedback in text.

## Review before upstream submission

- Use an empty millimeter design in Design → Solid. Confirm steps advance once, the current target is visible, an unrelated command is refused, and Escape followed by **Show the guide again** restores the current task.
- Draw the square with typed width and height, then check that the Sketch Palette reports **Fully constrained**. Confirm one solid measuring 30 mm on each axis after the first Extrude.
- Sketch the circle on a vertical side, constrain its center, and verify its diameter and constraint status. Pick just the disk in Extrude. Verify the cut leaves one solid with two openings and a volume of approximately 24,643.806 mm³.
- Confirm narration playback, mute, and target visibility with the tutorial pane at its default and narrow widths.

The native bridge observes command completion, input values, and kinds of picks. The learner must check sketch constraint status, exact geometry, and the cut preview. A completed command alone cannot prove those geometric outcomes. If the first Extrude was committed before the distance checkpoint finished, undo it, reopen Extrude, and enter 30 mm again.

The modeled reference was verified in MITCAD 0.71.0 via the model API. The learner click-through and embedded audio playback still need verification. The manifest's `LicenseRef-AMAS4GM-Review` marks this as a review package. Resolve content and narration licensing before public distribution.

## References

- [MITCAD tutorial authoring guide](https://github.com/mitcad/Mitcad/blob/main/docs/tutorials.md)
- [AMAS4GM software tutorials](https://github.com/amas4gm/amas4gm-courses)

