﻿using System.ComponentModel.DataAnnotations;

namespace CursoDotNet.DataAccess.Contracts.Entidades
{
    public class Cancion : EntidadBase
    {
        [Required]
        public int id { get; set; }
        [Required]
        public string titulo { get; set; }
        [Required]
        public int duracion { get; set; }
        [Required]
        public int Usuarioid { get; set; } //como en la migracion de base de datos
    }
}