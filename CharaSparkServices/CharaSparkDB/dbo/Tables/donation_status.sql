CREATE TABLE [dbo].[donation_status] (
    [donation_status_id]   INT          IDENTITY (1, 1) NOT NULL,
    [donation_status_desc] VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_donation_status] PRIMARY KEY CLUSTERED ([donation_status_id] ASC)
);

