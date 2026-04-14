1 Iterate over params of method :
 RegisterError regError=null;
 var parameters = typeof(RegisterError)
     .GetMethod(MethodBase.GetCurrentMethod().Name)
     .GetParameters();
 
 for(int i=0;i<parameters.Length;i++)
 {
     var result = (Result<object>)parameters.GetValue(i);
 2 get property by name :
 typeof(Class).GetProperty(name)
 3 get name of type(class):
 typeof(Class).Name
 4 create readonlylist property :
 private static readonly IReadOnlyList<string> _fields 
    = new List<string> { "username","password" }.AsReadOnly();
5