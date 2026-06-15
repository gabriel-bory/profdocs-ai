# Database Model

This document describes the initial conceptual database model for ProfDocs AI.

The model will evolve gradually across MVP versions.

## MVP 0.1

The first version only documents the model conceptually.

### Workspace

A workspace represents a knowledge area or project.

Fields:

```text
id
name
description
createdAt
updatedAt
```

### Document

A document represents a file added to a workspace.

Fields:

```text
id
workspaceId
title
originalFilename
type
status
createdAt
updatedAt
```

## MVP 0.2

### DocumentChunk

A document chunk represents a smaller section of a processed document.

Fields:

```text
id
documentId
content
chunkIndex
characterCount
createdAt
```

### Document Status

Allowed status values:

```text
uploaded
processing
ready
failed
```

## MVP 0.3

The model will be extended for RAG.

### DocumentChunk with Embedding

Fields:

```text
id
documentId
content
chunkIndex
embedding
embeddingModel
metadata
createdAt
```

### RagQuery

A RAG query stores a question, generated answer and source fragments.

Fields:

```text
id
workspaceId
question
answer
sources
createdAt
```

## MVP 0.4

### Conversation

A conversation groups messages inside a workspace.

Fields:

```text
id
workspaceId
title
createdAt
updatedAt
```

### Message

A message represents a user or assistant message.

Fields:

```text
id
conversationId
role
content
sources
createdAt
```

Allowed roles:

```text
user
assistant
system
```
