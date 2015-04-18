CREATE TABLE [dbo].[users] (
    [user_id]      INT           IDENTITY (1, 1) NOT NULL,
    [first_name]   VARCHAR (20)  NULL,
    [middle_name]  VARCHAR (20)  NULL,
    [last_name]    VARCHAR (20)  NULL,
    [former_name]  VARCHAR (20)  NULL,
    [user_name]     VARCHAR (20)  NOT NULL,
    [e_mail]       VARCHAR (50)  NOT NULL,
    [create_date]  DATETIME      CONSTRAINT [DF_users_create_date] DEFAULT (getdate()) NULL,
    [created_by]   VARCHAR (50)  CONSTRAINT [DF_users_created_by] DEFAULT (suser_sname()) NULL,
    [update_date]  DATETIME      NULL,
    [is_active]    BIT           NOT NULL,
    [user_type_id] INT           NOT NULL,
    [password]     VARCHAR (100) NOT NULL,
    [phone] VARCHAR(20) NULL, 
    [skype] VARCHAR(50) NULL, 
    CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED ([user_id] ASC),
    CONSTRAINT [FK_users_user_type] FOREIGN KEY ([user_type_id]) REFERENCES [dbo].[user_type] ([user_type_id])
);



