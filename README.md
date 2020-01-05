```
const cats = [
    {
        id: 1,
        name: "Albus Dumblemeow",
        toys: [
            {
                id: 1,
                name: "Catnip Mousey",
            },
            {
                id: 2,
                name: "Unattended bowl of greek yogurt"
            }
        ]
    },
    {
        id: 2,
        name: "Taco"
        toys: [
            {
                id: 1,
                name: "Catnip Mousey",   
            },
        ]

    }
]
```

Given some information about the data's structure, can be normalized with:

```
    const { 
        models: cats,
        childModels: toys,
    } = normalizeChildModels(cats, 'toys', 'toyIds');

    addModels('cats', cats);
```

And, internally, becomes:

```
const models = {
  cats: {
    1: {
      id: 1,
      name: "Albus Dumblemeow",
      toyIds: [1, 2]
    },
    2: {
        id: 1,
        name: "Albus Dumblemeow",
        toyIds: [1]
    }
  },
  toys: {
    1: {
      id: 1,
      name: "Catnip Mousey",
      priority: 3,   
    },
    2: {
      id: 2,
      name: "Unattended bowl of greek yogurt"
      priority: 1
    }
  }
}
```

In application code, any given model can be pulled out of the store with:

```
const albusId = 1;
const albus = getModel('cats', 1);
const albusToys = albus.toyIds.map(id => getModel('toys', id));
```

