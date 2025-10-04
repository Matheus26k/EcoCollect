import { MaterialTypeRepository } from '../repositories/MaterialTypeRepository';

export class MaterialTypeService {
  private materialTypeRepository = new MaterialTypeRepository();

  async getActive() {
    return await this.materialTypeRepository.findActive();
  }

  async getAll() {
    return await this.materialTypeRepository.findAll();
  }
}