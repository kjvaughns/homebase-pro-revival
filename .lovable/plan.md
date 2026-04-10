

## Fix AI Intake Question Types

**Problem**: The AI prompt in the edge function (line 104) only instructs the AI to use `yes_no`, `single_choice`, and `number` question types — it never mentions `text`. Additionally, `single_choice` questions sometimes come back without the required `options` array.

### Change: Update `supabase/functions/ai-intake/index.ts`

Update the system prompt on line 104 to include `text` as a valid question type and reinforce that `single_choice` must include options:

```
- 3-5 diagnostic questions to better understand the problem. Use these types:
  - yes_no: for yes/no questions
  - single_choice: for multiple choice (MUST include options array)
  - text: for open-ended questions where the user types a free response
  - number: for numeric answers
  Give each question a unique id like "q1", "q2", etc. Include at least one text question.
```

This ensures the AI generates a mix of question types including free-text input fields, matching what the iOS app shows.

