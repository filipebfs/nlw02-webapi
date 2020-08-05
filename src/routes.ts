import express from 'express';
import db from './database/connection';
import { convertTimeStringToMinutes } from './utils/convertTimeStringToMinutes';

interface ScheduleItem
{
   week_day: number;
   from: string;
   to: string;
}

const routes = express.Router();


routes.get(
   '/',
   (request, response) =>
   {      
   }
);

routes.post(
   '/classes',
   async (request, response) =>
   {
      const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;

      const trx = await db.transaction();

      try 
      {
         const insertedUsersIds = await trx('users').insert({ name, avatar, whatsapp, bio });
         const usert_id = insertedUsersIds[0];
         const insertedClassesIds = await trx('classes').insert({ subject, cost, usert_id });
         const class_id = insertedClassesIds[0];
   
         const classSchedule = schedule
            .map((item: ScheduleItem) =>
               ({
                  class_id,
                  week_day: item.week_day,
                  from: convertTimeStringToMinutes(item.from),
                  to: convertTimeStringToMinutes(item.to)
               })
            );
   
         await trx('class_schedules').insert(classSchedule);
   
         await trx.commit();

         return response.status(201).send();
      } 
      catch (error) 
      {
         await trx.rollback();

         return response
            .status(400)
            .send(
               {
                  error: 'Unexpected error while creating new class'
               }
            )
      }
      
   }
)

export default routes;
