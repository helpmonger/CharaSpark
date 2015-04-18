CREATE TABLE [dbo].[error_log] (
    [error_id]   INT           IDENTITY (1, 1) NOT NULL,
    [error_desc] VARCHAR (MAX) NULL,
    [error_date] DATETIME      CONSTRAINT [DF_error_log_constraint] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_error_log] PRIMARY KEY CLUSTERED ([error_id] ASC)
);

