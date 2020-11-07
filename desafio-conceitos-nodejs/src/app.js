const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');
const { json } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, tech, likes} = request.body;
  const repository = {id:uuid(), title, url, tech, likes}

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, tech} = request.body;

  const repositoryIndex = repositories.findIndex(repository =>repository.id ===id)
  if(repositoryIndex <0){
    return response.status(400).json({"error":"repository not found"});
  }

  const repositorie = {
    id,
    title,
    url,
    tech,
    likes : repositories[repositoryIndex].likes,
  };

  repositories[repositoryIndex] = repositorie;

  return response.json(repositorie);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository =>repository.id ===id);

  if(repositoryIndex >=0){
    repositories.slice(repositoryIndex, 1);
  } else {
    return response.status(400).json({error : 'Repository doesnt exists'});
  }

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository =>repository.id ===id);

  if(repositoryIndex <0){
    return response.status(400).json({"error":"repository not found"});
  }

  repositories[repositoryIndex].likes +=1;

  return response.json(repositories[repositorieIndex]);

});

module.exports = app;
