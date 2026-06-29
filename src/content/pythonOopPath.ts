import type { PathUnit } from "../lessonPathTypes";

export const pythonOopUnits: PathUnit[] = [
  {
    id: "python-oop",
    title: "Object-Oriented Python",
    color: "#ffb454",
    lessons: [
      {
        id: "pyoop-1",
        title: "Classes and instances",
        content:
          "A class is a blueprint; an instance is a specific object built from it. `class Dog: def __init__(self, name): self.name = name` defines a class, and `Dog(\"Rex\")` creates an instance with its own `name` attribute.",
        question: "What's the difference between a class and an instance in Python?",
        options: [
          "There is no difference, they're the same thing",
          "A class is the blueprint/template, while an instance is a specific object created from that blueprint with its own data",
          "An instance can only ever have one class",
          "Classes can only be created inside functions",
        ],
        correctIndex: 1,
        explanation: "The class defines structure and behavior; each instance has its own independent copy of instance attributes.",
      },
      {
        id: "pyoop-2",
        title: "Inheritance and method overriding",
        content:
          "A subclass inherits attributes/methods from a parent class with `class Cat(Animal):`. It can override a parent's method by defining a method with the same name, and call the parent's version with `super().method()`.",
        question: "What does overriding a method in a subclass let you do?",
        options: [
          "Delete the method from the parent class entirely",
          "Provide a different implementation for that method specific to the subclass, while still optionally calling the parent's version via super()",
          "Run the parent's method twice automatically",
          "Nothing — Python doesn't support overriding",
        ],
        correctIndex: 1,
        explanation: "Overriding lets a subclass customize behavior while still being able to reuse the parent's logic via super() if needed.",
      },
      {
        id: "pyoop-3",
        title: "Dunder methods",
        content:
          "Dunder ('double underscore') methods like `__init__`, `__str__`, and `__eq__` let your objects hook into Python's built-in behavior. Defining `__str__` controls what `print(obj)` shows; defining `__eq__` controls what `==` does between two instances.",
        question: "If you want `print(my_object)` to show a custom, readable string instead of `<MyClass object at 0x...>`, which method should you define?",
        options: ["__init__", "__str__", "__del__", "__main__"],
        correctIndex: 1,
        explanation: "`__str__` controls the human-readable string representation used by print() and str().",
      },
      {
        id: "pyoop-4",
        title: "Class methods, static methods, instance methods",
        question: "What's the key difference between a `@staticmethod` and a regular instance method?",
        options: [
          "There's no difference, they're interchangeable",
          "A static method doesn't receive `self` (or the instance) at all — it's just a function namespaced inside the class",
          "Static methods can only return None",
          "Static methods run before __init__",
        ],
        correctIndex: 1,
        explanation: "A static method has no access to instance or class state via self/cls — it's grouped in the class purely for organization.",
      },
      {
        id: "pyoop-5",
        title: "Composition vs inheritance",
        content:
          "Inheritance models an 'is-a' relationship (a Car is a Vehicle). Composition models a 'has-a' relationship (a Car has an Engine) by holding another object as an attribute. Composition is often preferred since it avoids deep, brittle inheritance hierarchies.",
        question: "Why might 'composition over inheritance' be good advice when designing a Car class that needs an Engine?",
        options: [
          "Inheritance is always faster at runtime",
          "Modeling Engine as an attribute of Car (composition) avoids forcing an artificial 'Car is an Engine' relationship and stays more flexible to change",
          "Python doesn't actually support inheritance",
          "Composition means you can never reuse code",
        ],
        correctIndex: 1,
        explanation: "A Car 'has' an Engine, not 'is' one — composition models that relationship accurately and keeps classes more loosely coupled.",
      },
    ],
  },
];

export const allPythonOopLessons = pythonOopUnits.flatMap((u) => u.lessons);
