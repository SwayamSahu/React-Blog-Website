using BlogProjectWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BlogProjectWebApi.Data
{
    public class MyAppDbContext:DbContext
    {
        public MyAppDbContext(DbContextOptions<MyAppDbContext> options) : base(options) { }
    
        public DbSet<Blogs> Blogs { get; set; }
    }
}
