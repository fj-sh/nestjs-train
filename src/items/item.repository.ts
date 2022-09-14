import { EntityRepository, Repository } from 'typeorm';
import { Item } from '../entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';
import { User } from '../entities/user.entity';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async createItem(creteItemDto: CreateItemDto, user: User): Promise<Item> {
    const { name, price, description } = creteItemDto;
    const item = this.create({
      name,
      price,
      description,
      status: ItemStatus.ON_SALE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user,
    });

    await this.save(item);
    return item;
  }

  async updateStatus(item: Item): Promise<Item> {
    return await this.save(item);
  }
}
