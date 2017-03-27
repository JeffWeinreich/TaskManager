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
            var context = new OrganizerContext();
            context.Database.Migrate();

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
            services.AddMvc();
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
            var userManger = app.ApplicationServices.GetRequiredService<UserManager<ApplicationUser>>();

            var user = await userManger.FindByEmailAsync("a@d.com");
            user = await userManger.FindByEmailAsync("a@e.com");
            user = await userManger.FindByEmailAsync("a@f.com");

            if (user == null)
            {
                user = new ApplicationUser();
                user.Email = "a@d.com";
                await userManger.CreateAsync(user, "testtest1");
                var list1 = new List() { Name = "Shopping" };
                var list2 = new List() { Name = "Eat" };
                var list3 = new List() { Name = "Clean" };
                var list4 = new List() { Name = "Costco" };

                context.Lists.Add(list1);
                context.Lists.Add(list2);
                context.Lists.Add(list3);
                context.Lists.Add(list4);

                var todo1 = new Todo() { Name = "Food" };
                var todo2 = new Todo() { Name = "Lunch1" };
                var todo3 = new Todo() { Name = "Lunch2" };
                var todo4 = new Todo() { Name = "More Food" };
                var todo5 = new Todo() { Name = "Dinner1" };
                var todo6 = new Todo() { Name = "Dinner2" };
                var todo7 = new Todo() { Name = "Snack" };
                var todo8 = new Todo() { Name = "More Snacks" };

                list1.Todos.Add(todo1);
                list1.Todos.Add(todo2);
                list1.Todos.Add(todo3);
                list1.Todos.Add(todo4);

                list2.Todos.Add(todo5);
                list2.Todos.Add(todo6);
                list2.Todos.Add(todo7);
                list2.Todos.Add(todo8);

                list3.Todos.Add(todo3);
                list3.Todos.Add(todo5);
                list3.Todos.Add(todo8);
                list3.Todos.Add(todo1);

                list4.Todos.Add(todo2);
                list4.Todos.Add(todo4);
                list4.Todos.Add(todo8);
                list4.Todos.Add(todo5);

                context.Add(user);

                user = new ApplicationUser();
                user.Email = "a@e.com";
                await userManger.CreateAsync(user, "testtest1");
                list1 = new List() { Name = "Shopping" };
                list2 = new List() { Name = "Eat" };
                list3 = new List() { Name = "Clean" };
                list4 = new List() { Name = "Costco" };

                context.Lists.Add(list1);
                context.Lists.Add(list2);
                context.Lists.Add(list3);
                context.Lists.Add(list4);

                todo1 = new Todo() { Name = "Food" };
                todo2 = new Todo() { Name = "Lunch1" };
                todo3 = new Todo() { Name = "Lunch2" };
                todo4 = new Todo() { Name = "More Food" };
                todo5 = new Todo() { Name = "Dinner1" };
                todo6 = new Todo() { Name = "Dinner2" };
                todo7 = new Todo() { Name = "Snack" };
                todo8 = new Todo() { Name = "More Snacks" };

                list1.Todos.Add(todo1);
                list1.Todos.Add(todo2);
                list1.Todos.Add(todo3);
                list1.Todos.Add(todo4);

                list2.Todos.Add(todo5);
                list2.Todos.Add(todo6);
                list2.Todos.Add(todo7);
                list2.Todos.Add(todo8);

                list3.Todos.Add(todo3);
                list3.Todos.Add(todo5);
                list3.Todos.Add(todo8);
                list3.Todos.Add(todo1);

                list4.Todos.Add(todo2);
                list4.Todos.Add(todo4);
                list4.Todos.Add(todo8);
                list4.Todos.Add(todo5);

                context.Add(user);

                user = new ApplicationUser();
                user.Email = "a@f.com";
                await userManger.CreateAsync(user, "testtest1");
                list1 = new List() { Name = "Shopping" };
                list2 = new List() { Name = "Eat" };
                list3 = new List() { Name = "Clean" };
                list4 = new List() { Name = "Costco" };

                context.Lists.Add(list1);
                context.Lists.Add(list2);
                context.Lists.Add(list3);
                context.Lists.Add(list4);

                todo1 = new Todo() { Name = "Food" };
                todo2 = new Todo() { Name = "Lunch1" };
                todo3 = new Todo() { Name = "Lunch2" };
                todo4 = new Todo() { Name = "More Food" };
                todo5 = new Todo() { Name = "Dinner1" };
                todo6 = new Todo() { Name = "Dinner2" };
                todo7 = new Todo() { Name = "Snack" };
                todo8 = new Todo() { Name = "More Snacks" };

                list1.Todos.Add(todo1);
                list1.Todos.Add(todo2);
                list1.Todos.Add(todo3);
                list1.Todos.Add(todo4);

                list2.Todos.Add(todo5);
                list2.Todos.Add(todo6);
                list2.Todos.Add(todo7);
                list2.Todos.Add(todo8);

                list3.Todos.Add(todo3);
                list3.Todos.Add(todo5);
                list3.Todos.Add(todo8);
                list3.Todos.Add(todo1);

                list4.Todos.Add(todo2);
                list4.Todos.Add(todo4);
                list4.Todos.Add(todo8);
                list4.Todos.Add(todo5);

                context.Add(user);
                context.SaveChanges();
            }


        }
    }
}
