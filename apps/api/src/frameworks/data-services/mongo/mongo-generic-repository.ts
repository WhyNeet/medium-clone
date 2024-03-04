import type { IGenericRepository } from "@/core/abstracts/generic-repository.abstract";
import type { Model } from "mongoose";

export class MongoGenericRepository<Entity>
  implements IGenericRepository<Entity>
{
  private model: Model<Entity>;

  constructor(model: Model<Entity>) {
    this.model = model;
  }

  create(entity: Entity): Promise<Entity> {
    return this.model.create(entity);
  }

  getAll(): Promise<Entity[]> {
    return this.model.find().exec();
  }

  get(id: string): Promise<Entity | null> {
    return this.model.findById(id).exec();
  }

  update(id: string, entity: Entity): Promise<Entity | null> {
    return this.model.findByIdAndUpdate(id, entity).exec();
  }

  delete(id: string): Promise<Entity | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
