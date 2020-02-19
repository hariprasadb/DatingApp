using System;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _dbContext;

        public AuthRepository(DataContext context)
        {
            _dbContext = context;

        }
        public async Task<User> Register(string userName, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            var user = new User() {
                 UserName = userName,
                 PasswordHash = passwordHash,
                 PasswordSalt = passwordSalt
            };
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }
        
        public async Task<User> Login(string userName, string password)
        {
             var user  = await _dbContext.Users.FirstOrDefaultAsync(v=>v.UserName == userName);
             if (user == null)  return null;

             if (!VerifyPassword(password, user.PasswordHash, user.PasswordSalt ))
                  return null;
            return user;
        
        }
        
        public async Task<bool> UserExists(string userName)
        {
           return await _dbContext.Users.AnyAsync(v=>v.UserName == userName);
        }


        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
             {
                passwordSalt  = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            }
        }

        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            byte[] computedHash;
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
             {
                computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for(int i=0;i<computedHash.Length;i++)  {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }

    }
}