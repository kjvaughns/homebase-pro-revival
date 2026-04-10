

## Fix AI Question Type Selection

**Problem**: The AI sometimes assigns `text` type to questions that clearly have a limited set of answers (e.g., "Is the water leaking constantly, or only when the sink is being used?" should be `single_choice` with options like "Constantly", "Only when in use", "Not sure"). The prompt needs stronger guidance on when to use each type.

### Change: Update `supabase/functions/ai-intake/index.ts`

Update the system prompt (lines 104-109) to give clearer rules about when to use each question type:

```
- 3-5 diagnostic questions to better understand the problem. Choose the BEST type for each question:
  - yes_no: ONLY for strict yes/no questions (e.g. "Is there visible damage?")
  - single_choice: for questions with a finite set of answers. ALWAYS include an options array with 2-5 choices. Use this when the answer can be one of several specific options (e.g. "Where is the leak?" → ["Faucet", "Drain pipe", "Wall connection", "Not sure"])
  - text: ONLY for truly open-ended questions where you cannot predict the answers (e.g. "Describe any unusual sounds you're hearing")
  - number: for numeric answers (e.g. "How many drips per minute?")
  Prefer single_choice over text whenever the possible answers can be listed. Give each question a unique id like "q1", "q2", etc.
```

This tells the AI to default to `single_choice` when possible and only use `text` for genuinely open-ended questions, matching the iOS app behavior shown in the screenshot.

### Deploy
Re-deploy the `ai-intake` edge function.

