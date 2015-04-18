USE [charaspark]
GO

INSERT INTO [dbo].[wishes]
           ([wish_name]
           ,[wish_status_id]
           ,[create_date]
           ,[created_by]
           ,[update_date]
           ,[is_active]
           ,[start_date]
           ,[end_date]
           ,[user_id])
     VALUES
           ('Pickup laundry'
           ,2
           ,'04-14-2015'
           ,'bkraider'
           ,NULL
           ,1
           ,'04-14-2015'
           ,NULL
           ,3)
GO


