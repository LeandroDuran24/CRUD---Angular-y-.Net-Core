using Microsoft.EntityFrameworkCore;

namespace BETarjeta.Models
{
    public class APlicationDbContext:DbContext
    {
        public DbSet<TarjetaCredito> TarjetaCredito { get; set; }

        public APlicationDbContext(DbContextOptions<APlicationDbContext> options):base(options)
        { }
    }
}
