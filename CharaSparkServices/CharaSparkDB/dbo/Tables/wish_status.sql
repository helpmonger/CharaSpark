CREATE TABLE [dbo].[wish_status] (
    [wish_status_id] INT          IDENTITY (1, 1) NOT NULL,
    [wish_status_desc]    VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_wish_status] PRIMARY KEY CLUSTERED ([wish_status_id] ASC)
);

