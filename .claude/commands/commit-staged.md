---
description: Create commit from currently staged changes
---

You are helping to create a git commit from the currently staged changes.

Follow these steps:

1. **Investigate Staged Changes**: Run `git diff --staged` and `git log -5 --oneline` in parallel

2. **Analyze Staged Changes**:
   - Review the staged changes and create a logical commit message
   - Follow the existing commit message style
   - Write clear, concise commit messages that explain WHY, not just WHAT

3. **Present the Plan** (use concise format):
   ```
   ## Proposed Commit

   ### <commit message>
   Staged files: <file1>, <file2>, ...
   ```

4. **Ask for Confirmation**: Use AskUserQuestion tool with options:
   - "Yes, proceed"
   - "No, let me modify"

5. **Execute Commit** (only if approved):
   - Create commit with the proposed message (files are already staged)
   - Show `git log -1 --oneline` to confirm

**Important Rules**:

- NEVER commit without user approval
- Only commit the already-staged files (do not stage additional files)
- Follow the git commit safety protocol from your instructions
- If there are no staged changes, inform the user
- Do NOT push to remote unless explicitly asked
