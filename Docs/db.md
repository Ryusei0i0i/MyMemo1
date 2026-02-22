```mermaid
erDiagram
    MEMOS {
        int id PK
        text title
        text content
        timestamptz created_at
        timestamptz updated_at
    }