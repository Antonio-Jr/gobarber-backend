import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import { MongoRepository, getMongoRepository } from 'typeorm';

export default class NotificationsRepository
  implements INotificationsRepository {
  private repository: MongoRepository<Notification>;

  constructor() {
    this.repository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = await this.repository.create({
      content,
      recipient_id,
    });

    await this.repository.save(notification);
    return notification;
  }
}
