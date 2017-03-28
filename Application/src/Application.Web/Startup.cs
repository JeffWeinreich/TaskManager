using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Application.Web.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Application.Web
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<OrganizerContext>();

            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
            })
                    .AddEntityFrameworkStores<OrganizerContext>()
                    .AddDefaultTokenProviders();

            // Add framework services.
            services.AddMvc().AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Serialize);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public async void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseIdentity();

            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            var context = app.ApplicationServices.GetRequiredService<OrganizerContext>();
            var userManager = app.ApplicationServices.GetRequiredService<UserManager<ApplicationUser>>();
            
            context.Database.Migrate();

            //Chris Nimmons
            var lorem = new Lorem();

            var user = await userManager.FindByEmailAsync("a@b.com");
            

            if (user == null)
            {
                user = new ApplicationUser();
                user.UserName = user.Email = "a@b.com";           

                var result = await userManager.CreateAsync(user, "testtest1");

                for (int i = 0; i < 4; i++)
                {
                    var list = new List() { Name = lorem.Word() };
                    context.Lists.Add(list);

                    var permission = new Permission() { User = user, List = list };
                    context.Permissions.Add(permission);

                    for (int j = 0; j < 4; j++)
                    {
                        var todo = new Todo() { Name = lorem.Sentence(2, 6) };
                        list.Todos.Add(todo);
                    }
                }
                context.SaveChanges();
            }

            var user2 = await userManager.FindByEmailAsync("a@c.com");

            if (user2 == null)
            {
                user2 = new ApplicationUser();
                user2.UserName = user2.Email = "a@c.com";              

                var result = await userManager.CreateAsync(user2, "testtest2");

                for (int i = 0; i < 4; i++)
                {
                    var list = new List() { Name = lorem.Word() };
                    context.Lists.Add(list);

                    var permission = new Permission() { User = user2, List = list };
                    context.Permissions.Add(permission);

                    for (int j = 0; j < 4; j++)
                    {
                        var todo = new Todo() { Name = lorem.Sentence(2, 6) };
                        list.Todos.Add(todo);
                    }
                }

                context.SaveChanges();
            }

            var user3 = await userManager.FindByEmailAsync("a@d.com");
            if (user3 == null)
            {
                user3 = new ApplicationUser();
                user3.UserName = user3.Email = "a@d.com";

                var result = await userManager.CreateAsync(user3, "testtest2");
            }
            context.SaveChanges();

                //user = new ApplicationUser();
                //user.Email = "a@e.com";
                //permissions.User = user;
                //permissions.List = list;

                //await userManager.CreateAsync(user, "testtest1");
                //context.Add(user);

                //list1 = new List() { Name = "Shopping" };
                //list2 = new List() { Name = "Eat" };
                //list3 = new List() { Name = "Clean" };
                //list4 = new List() { Name = "Costco" };

                //context.Lists.Add(list1);
                //context.Lists.Add(list2);
                //context.Lists.Add(list3);
                //context.Lists.Add(list4);

                //// context.Permissions.Add(permissions);

                //todo1 = new Todo() { Name = "Food" };
                //todo2 = new Todo() { Name = "Lunch1" };
                //todo3 = new Todo() { Name = "Lunch2" };
                //todo4 = new Todo() { Name = "More Food" };
                //todo5 = new Todo() { Name = "Dinner1" };
                //todo6 = new Todo() { Name = "Dinner2" };
                //todo7 = new Todo() { Name = "Snack" };
                //todo8 = new Todo() { Name = "More Snacks" };

                //list1.Todos.Add(todo1);
                //list1.Todos.Add(todo2);
                //list1.Todos.Add(todo3);
                //list1.Todos.Add(todo4);

                //list2.Todos.Add(todo5);
                //list2.Todos.Add(todo6);
                //list2.Todos.Add(todo7);
                //list2.Todos.Add(todo8);

                //list3.Todos.Add(todo3);
                //list3.Todos.Add(todo5);
                //list3.Todos.Add(todo8);
                //list3.Todos.Add(todo1);

                //list4.Todos.Add(todo2);
                //list4.Todos.Add(todo4);
                //list4.Todos.Add(todo8);
                //list4.Todos.Add(todo5);

                //user = new ApplicationUser();
                //user.Email = "a@f.com";

                //permissions.User = user;
                //permissions.List = list;

                //await userManager.CreateAsync(user, "testtest1");
                //context.Add(user);

                //list1 = new List() { Name = "Shopping" };
                //list2 = new List() { Name = "Eat" };
                //list3 = new List() { Name = "Clean" };
                //list4 = new List() { Name = "Costco" };

                //context.Lists.Add(list1);
                //context.Lists.Add(list2);
                //context.Lists.Add(list3);
                //context.Lists.Add(list4);

                //todo1 = new Todo() { Name = "Food" };
                //todo2 = new Todo() { Name = "Lunch1" };
                //todo3 = new Todo() { Name = "Lunch2" };
                //todo4 = new Todo() { Name = "More Food" };
                //todo5 = new Todo() { Name = "Dinner1" };
                //todo6 = new Todo() { Name = "Dinner2" };
                //todo7 = new Todo() { Name = "Snack" };
                //todo8 = new Todo() { Name = "More Snacks" };

                //list1.Todos.Add(todo1);
                //list1.Todos.Add(todo2);
                //list1.Todos.Add(todo3);
                //list1.Todos.Add(todo4);

                //list2.Todos.Add(todo5);
                //list2.Todos.Add(todo6);
                //list2.Todos.Add(todo7);
                //list2.Todos.Add(todo8);

                //list3.Todos.Add(todo3);
                //list3.Todos.Add(todo5);
                //list3.Todos.Add(todo8);
                //list3.Todos.Add(todo1);

                //list4.Todos.Add(todo2);
                //list4.Todos.Add(todo4);
                //list4.Todos.Add(todo8);
                //list4.Todos.Add(todo5);

                //context.Permissions.Add(permissions);
                //await context.SaveChangesAsync();



            }
        }
}
