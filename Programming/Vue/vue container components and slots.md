This is the **Child.vue** component that defines a default slot.

```vue

<!-- Child.vue -->

<template>

  <div>

    <slot></slot> <!-- Default slot -->

  </div>

</template>

  
```

This is the **Parent.vue** component that uses the **Child.vue** component with a default slot.

```vue

<!-- Parent.vue -->

<template>

  <div>

    <Child>

      <p>This is the content for the default slot.</p>
      <p>This is the content for the default slot.</p>
      <p>This is the content for the default slot.</p>
      

    </Child>

  </div>

</template>



```

This is the **Child.vue** component with both a default slot and a named slot.


```vue

<!-- Child.vue -->

<template>

  <div>

    <slot></slot> <!-- Default slot -->

    <slot name="named"></slot> <!-- Named slot -->

  </div>

</template>



```

  

This is the **Parent.vue** component that uses both default and named slots from the **Child.vue** component.

  

```vue

<!-- Parent.vue -->

<template>

  <div>

    <Child>

      <template v-slot:named>

        <p>This is the content for the named slot.</p>

      </template>

      <p>This is the content for the default slot.</p>

    </Child>

  </div>

</template>

  


```

  

This is the **Child.vue** component that consumes a message from parent component

  

```vue

<!-- Child.vue -->

<template>

  <div>

    <slot v-bind:message="message"></slot> <!-- Default slot with prop -->

    <slot name="named" v-bind:message="message"></slot> <!-- Named slot with prop -->

  </div>

</template>

  


```

  

This is the **Parent.vue** component that passes

  

```vue

<!-- Parent.vue -->

<template>

  <div>

    <h1>Parent Component</h1>

    <child-component>

      <template v-slot:default="{ message }"> // or v-bind="content"

        <p>Default Slot: {{ message }}</p>

      </template>

  

      <template v-slot:named="{ message }">

        <p>Named Slot: {{ message }}</p>

      </template>

    </child-component>

  </div>

</template>

  

