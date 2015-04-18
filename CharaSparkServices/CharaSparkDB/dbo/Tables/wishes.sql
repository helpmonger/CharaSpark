CREATE TABLE [dbo].[wishes] (
    [wish_id]            INT           IDENTITY (1, 1) NOT NULL,
    [wish_name]          VARCHAR (50)  NOT NULL,
    [wish_status_id]     INT           NULL,
    [create_date]        DATETIME      CONSTRAINT [DF_wishes_create_date] DEFAULT (getdate()) NOT NULL,
    [created_by]         VARCHAR (50)  CONSTRAINT [DF_wishes_created_by] DEFAULT (suser_sname()) NOT NULL,
    [update_date]        DATETIME      NULL,
    [is_active]          BIT           NOT NULL,
    [start_date]         DATETIME      NULL,
    [end_date]           DATETIME      NULL,
    [user_id]            INT           NOT NULL,
    [fullfiller_user_id] INT           NULL,
    [gps_coordinates]    VARCHAR (50)  NULL,
    [donation_amount]    MONEY         NULL,
    [charity_name]       VARCHAR (100) NOT NULL,
    [charity_email]      VARCHAR (50)  NOT NULL,
    [donation_status_id] INT           NOT NULL,
    CONSTRAINT [PK_wishes] PRIMARY KEY CLUSTERED ([wish_id] ASC),
    CONSTRAINT [FK_wishes_donation_status] FOREIGN KEY ([donation_status_id]) REFERENCES [dbo].[donation_status] ([donation_status_id]),
    CONSTRAINT [FK_wishes_users] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users] ([user_id]),
    CONSTRAINT [FK_wishes_wish_status] FOREIGN KEY ([wish_status_id]) REFERENCES [dbo].[wish_status] ([wish_status_id])
);







