

DbContextOptionsBuilder<YourDbContext>() optionsBuilder = new  ();
optionsBuilder.UseInMemoryDataBase(MethodBase.GetCurrentMethod().Name); 
using(new YourDbContext cntx = new (optionsBuilder.Options)){
 var controller = new YourController(cntx);
}
Создаем опшнс билдер с опциями ин мемори для текущего метода, открываем соединение с бд и используем наш контекст с опциями.^inmemoryDatabase 
