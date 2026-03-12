// start creating server here
const express = require('express');
const fs = require('fs/promises');
const app = express();

app.use(express.json());

let ids = 0;

/*
1. **`POST /create/todo`**
   - Reads the JSON body containing `title` and `description`.
   - Creates a new Todo, assigning it an automatically incremented integer `id` (starting at 1).
   - Returns the updated list of all Todos in JSON format.
*/

app.post("/create/todo", async (req, res) => {
    try {
        const { title, description } = req.body;
        // write this todo in a json file and increment the global ids

        // STEP 1 : Get all todos and append the one we just created :
        const todo = await fs.readFile('todo.json', 'utf-8');
        const actualTodoData = JSON.parse(todo);

        // Creating Todo 
        ids++;
        const newTodo = { "id": ids, "title": title, "description": description };
        actualTodoData.push(newTodo);

        // STEP 2 : Add those updated todo list in to the file back
        await fs.writeFile('todo.json', JSON.stringify(actualTodoData, null, 2));

        res.status(200).json(actualTodoData);
    }
    catch (err) {
        res.status(403).send("can't add todo");
    }
});


/*
2. **`GET /todos`**
   - Returns the list of all created Todos in JSON format.
*/

app.get('/todos', async (req, res) => {
    try {
        const todos = await fs.readFile("todo.json", 'utf-8');
        const actualTodoData = JSON.parse(todos);
        res.status(200).json(actualTodoData);

    } catch (error) {
        res.status(404).send("NOT FOUND");
    }
})


/*
3. **`GET /todo?id=XXX`**
   - Returns a single Todo object matching the numeric `id` provided in the query parameters.
   - If no Todo is found for the given `id`, it should respond with a `404` status code and the JSON body `{"error": "Todo not found"}`.
*/

app.get('/todo', async (req, res) => {
    try {
        const id = req.query?.id;

        const todos = await fs.readFile('todo.json', 'utf-8');

        const actualTodoData = JSON.parse(todos);

        const answerTodo = actualTodoData.find((todo) =>
            (todo.id == id)
        );  // find returns object

        if (!answerTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.status(200).json(answerTodo); // returning a single object ?? confused a little 
    } catch (error) {
        res.status(404).send({ 'error': "Todo not found" });
    }
})

/*
4. **`DELETE /todo?id=XXX`**
   - Deletes a specific Todo matching the numeric `id` in the query parameters from the array.
   - Responds with a `200` status code upon success.
   - If the `id` does not exist, it should respond with a `404` status code and an appropriate JSON error object (e.g., `{"error": "Todo not found"}`).
*/

app.delete('/todo', async (req, res) => {
    try {
        const id = req.query?.id;

        const todos = await fs.readFile('todo.json', 'utf-8');

        const actualTodoData = JSON.parse(todos);

        const toWrite = actualTodoData.filter((todo) => (todo.id != id));

        await fs.writeFile('todo.json', JSON.stringify(toWrite, null, 2));

        res.status(200).send("succesfully deleted");
    } catch (error) {
        res.status(404).send({ "error": "Todo not found" });
    }
})

app.listen(3000, () => {
    console.log("Listening on port Number 3000");
})
