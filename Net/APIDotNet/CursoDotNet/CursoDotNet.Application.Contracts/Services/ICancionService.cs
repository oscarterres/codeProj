﻿using CursoDotNet.Application.BusinessModels.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CursoDotNet.Application.Contracts.Services
{
    public interface ICancionService
    {
      Task  <List<CancionModel>> GetAll();
        Task<object> GetFilteredPaginate(string nombreUsuario, int numPagina, int numElementos);
    }
}