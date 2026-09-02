*Placeholder write-up — the shape is right, the detail is thin. Expand it when you have time.*

Marigold turns a PDF into something you can actually study from. Upload your notes,
get generated flashcards, work through them, then take a timed quiz on the same
material and see what you got wrong.

The point is the gap between *having* notes and *knowing* them. Re-reading a PDF
feels like studying and mostly is not; being asked a question and getting it wrong
is the part that sticks. Marigold makes the second thing cheap enough to actually do.

## What it does

- **Upload a PDF.** Drag and drop, and the text is parsed out server-side.
- **Generated flashcards.** Cards are produced from the document's own content and
  tagged by topic. Regenerate them if the first pass was poor.
- **Study mode.** Flip through cards, mark each one "still learning" or "got it",
  and watch the known count climb.
- **Timed quiz.** Pick 5, 10 or 15 questions at 30 seconds each.
- **Results.** Score, time taken, and every wrong answer with the correction.
- **Editable decks.** Cards are yours to fix — generation is a starting point, not
  the final word.

## How it is built

React with Vite and Tailwind on the front, FastAPI on the back, SQLite through
SQLAlchemy for decks, cards, quizzes and results. PDF text extraction is PyPDF2;
card and question generation is Gemini 1.5 Flash. The whole thing ships as a
single container.

## Notes to expand

- What makes a generated card good, and how the prompt changed once real notes
  went through it.
- Why quiz state lives server-side instead of in the browser.
- Where PDF parsing falls over — slides, two-column papers, scans.
