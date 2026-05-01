  import { Injectable, NotFoundException } from '@nestjs/common';
  import { CreateClienteDto } from './dto/create-cliente.dto';
  import { UpdateClienteDto } from './dto/update-cliente.dto';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Cliente } from './entities/cliente.entity';
  import { Repository } from 'typeorm';

  @Injectable()
  export class ClientesService {
  constructor(
      @InjectRepository(Cliente)
      private readonly repo: Repository<Cliente>,
    ) {}

    create(createClienteDto: CreateClienteDto):Promise<Cliente>  {
      const cliente = this.repo.create(createClienteDto);
      return this.repo.save(cliente);
    }

    findAll(): Promise<Cliente[]> {
      return this.repo.find();
    }

    async findOne(id: number):Promise<Cliente | null> {
      const cliente = await this.repo.findOneBy({ id });
      if (!cliente) throw new NotFoundException('Cliente no encontrado');
      return cliente;
    }

    async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente | null> {
      const cliente = await this.repo.findOneBy({ id });
      if (!cliente) throw new NotFoundException('Cliente no encontrado');
      await this.repo.update(id, updateClienteDto);
      return this.findOne(id);
    }

    async remove(id: number) {
      const cliente = await this.repo.findOneBy({ id });
      if (!cliente) throw new NotFoundException('Cliente no encontrado');
      return this.repo.remove(cliente);
    }
  }
