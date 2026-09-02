*Upload a PDF of your notes. Get flashcards generated from it, study them, then take a timed quiz on the same material and see exactly what you missed.*

The gap that matters is between *having* notes and *knowing* them. Re-reading a PDF
feels like studying and mostly is not — the material is familiar, so recognition
gets mistaken for recall. Being asked a question and getting it wrong is the part
that sticks. Marigold exists to make that second thing cheap enough to actually do.

## What it does

**Upload a PDF.** Drag and drop or pick a file. Text is extracted server-side with
PyPDF2 and handed to the model.

**Generated flashcards.** Cards come from the document's own content, tagged by
topic. Regenerate the deck if the first pass was poor — generation is a starting
point, not a verdict.

**Study mode.** Flip through cards, mark each one "still learning" or "got it", and
watch the known count climb against the deck size.

**Editable decks.** Cards are yours to fix. A generated question that is wrong or
badly phrased gets corrected in place rather than thrown out with the deck.

**Timed quiz.** Pick 5, 10 or 15 questions, 30 seconds each.

**Results that are useful.** Score and time taken, then every wrong answer listed
with its correction — which is the only part of a quiz worth reading.

## How it is built

React with Vite and Tailwind on the front. FastAPI on the back, with SQLite through
SQLAlchemy holding documents, decks, cards, quizzes and results. Gemini 1.5 Flash
generates cards and questions; PyPDF2 does the extraction. The API is small and
document-scoped — upload returns a `doc_id`, and flashcards, quizzes and results all
hang off it.

Quiz state lives on the server rather than in the browser: a quiz is started, each
answer is submitted and returns the next question, and results are fetched by quiz
id. That costs a round trip per question and buys a timer the client cannot edit.

Errors from PDF parsing and from the model are surfaced as readable messages rather
than swallowed, because both fail often enough that silence would be the wrong
default. The whole thing ships as a single container.

## What I would write up next

- What makes a generated card good, and how the prompt changed once real lecture
  notes went through it.
- Where PDF extraction falls over — slides, two-column papers, anything scanned.
- Whether topic tags should be generated per-card or per-document.
