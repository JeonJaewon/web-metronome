---
description: Analyze changes and create logical, meaningful commits
---

You are helping to create well-organized git commits from the current changes.

Follow these steps:

1. **Investigate Changes**: Run `git status`, `git diff`, `git diff --staged`, and `git log -5 --oneline` in parallel

2. **Analyze and Plan Commits**:
   - Group related changes into logical, atomic commits
   - Follow the existing commit message style
   - Write clear, concise commit messages

3. **Present the Plan** (use concise format):
   ```
   Proposed commits:
   1. <commit message>
      Files: <file1>, <file2>, ...

   2. <commit message>
      Files: <file1>, <file2>, ...
   ```

4. **Ask for Confirmation**: Use AskUserQuestion tool with options:
   - "Yes, proceed"
   - "No, let me modify"

5. **Execute Commits** (only if approved):
   - Stage files and create commits
   - Show final `git log --oneline -n <number_of_commits>` to confirm

**Important Rules**:

- NEVER commit without user approval
- NEVER use `git commit -a` or `git add .` - be specific about files
- Follow the git commit safety protocol from your instructions
- If there are no changes to commit, inform the user
- Do NOT push to remote unless explicitly asked
