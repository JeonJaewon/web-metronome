---
description: Analyze changes and create logical, meaningful commits
---

You are helping to create well-organized git commits from the current changes.

Follow these steps:

1. **Investigate Changes**:
   - Run `git status` to see all changed, staged, and untracked files
   - Run `git diff` to see unstaged changes
   - Run `git diff --staged` to see staged changes
   - Run `git log -5 --oneline` to see recent commit style

2. **Analyze and Plan Commits**:
   - Group related changes into logical, atomic commits
   - Each commit should represent a single logical change (e.g., "Add feature X", "Fix bug Y", "Refactor Z")
   - Consider separating:
     - New features
     - Bug fixes
     - Refactoring
     - Documentation changes
     - Configuration changes
     - Dependency updates
   - Follow the existing commit message style from the git log
   - Write clear, concise commit messages that explain WHY, not just WHAT

3. **Present the Plan**:
   - Show the user a numbered list of proposed commits
   - For each commit, list:
     - The commit message
     - The files to be included
     - A brief explanation of the changes
   - Format it clearly so the user can review

4. **Ask for Confirmation**:
   - Use the AskUserQuestion tool to ask if the user approves the commit plan
   - Options should be:
     - "Yes, proceed with these commits"
     - "No, let me modify the plan"

5. **Execute Commits** (only if approved):
   - For each planned commit:
     - Stage only the relevant files using `git add`
     - Create the commit with the proposed message
   - After all commits are done, show `git log` to confirm success

**Important Rules**:
- NEVER commit without user approval
- NEVER use `git commit -a` or `git add .` - be specific about files
- Follow the git commit safety protocol from your instructions
- If there are no changes to commit, inform the user
- Do NOT push to remote unless explicitly asked
