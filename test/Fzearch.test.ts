import { Fzearch } from "../src";

describe("Search with class instance", () => {
  describe("Testing with titles", () => {
    let fzearch: Fzearch;

    const db = [
      "Algorithm of Searching Agentsz",
      "Debounce and Throttle",
      "React Hooks",
      "Persisting State in React",
      "Deep Copy and Shadow Copy in Javascript",
      "Common React Mistakes",
    ];

    const search: { query: string; firstResult: string }[] = [
      {
        query: "React",
        firstResult: "React Hooks",
      },
      {
        query: "React Hooks",
        firstResult: "React Hooks",
      },
      {
        query: "co re mis",
        firstResult: "Common React Mistakes",
      },
      {
        query: "per in",
        firstResult: "Persisting State in React",
      },
    ];

    beforeEach(() => {
      fzearch = new Fzearch(db);
    });

    search.forEach(({ query, firstResult }) => {
      it(`should return ${firstResult} as the first result when searching for ${query}`, () => {
        expect(fzearch.search(query)[0]).toEqual(firstResult);
      });
    });
  });

  describe("Testing with words", () => {
    let fzearch: Fzearch;

    const db = ["algorithm", "searching", "agents", "debounce", "throttle"];

    const search: { query: string; firstResult: string }[] = [
      {
        query: "searching",
        firstResult: "searching",
      },
      {
        query: "se",
        firstResult: "searching",
      },
      {
        query: "searching agents",
        firstResult: "searching",
      },
    ];

    beforeEach(() => {
      fzearch = new Fzearch(db);
    });

    search.forEach(({ query, firstResult }) => {
      it(`should return ${firstResult} as the first result when searching for ${query}`, () => {
        expect(fzearch.search(query)[0]).toEqual(firstResult);
      });
    });
  });

  describe("Testing with custom function", () => {
    const getPenalty = (dist: number): number => {
      return dist * 20;
    };

    const getSimilarity = (char1: string, char2: string): number => {
      return char1[0] === char2[0] ? 15 : -10;
    };

    const db = ["algorithm", "searching", "agents", "debounce", "throttle"];
    const query = "searchin g agents";

    let fzearch: Fzearch;
    beforeEach(() => {
      fzearch = new Fzearch(db, {
        getPenalty,
        getSimilarity,
        showScore: true,
      });
    });

    it("should return 'searching' as the first result", () => {
      expect(fzearch.search(query)[0]).toEqual({
        item: "searching",
        score: -115,
      });
    });
  });

  describe("Testing maxResults", () => {
    let fzearch: Fzearch;

    const db = ["algorithm", "searching", "agents", "debounce", "throttle"];
    const query = "searching agents";

    beforeEach(() => {
      fzearch = new Fzearch(db, {
        maxResults: 2,
      });
    });

    it("should return 2 results", () => {
      expect(fzearch.search(query).length).toEqual(2);
    });
  });

  describe("Testing for case sensitivity", () => {
    let fzearch: Fzearch;

    const db = ["React", "react", "REACT", "rEaCt"];

    it("should return 'REACT' as the first result if we seach 'REACt", () => {
      fzearch = new Fzearch(db);
      expect(fzearch.search("REACt")[0]).toEqual("REACT");
    });

    it("return the correct result based on the caseSensitive option value", () => {
      let fzearch = new Fzearch(db, {
        caseSensitive: false,
      });
      expect(fzearch.search("REACT")[0]).toEqual("React");

      fzearch = new Fzearch(db, {
        caseSensitive: true,
      });
      expect(fzearch.search("REACT")[0]).toEqual("REACT");
    });
  });
  describe("Testing with Object", () => {
    let fzearch: Fzearch;

    describe("Testing with simple object with one levet", () => {
      const db = [
        { name: "John Doe", age: 20 },
        { name: "Jane Doe", age: 25 },
        { name: "John Smith", age: 30 },
        { name: "Jane Smith", age: 35 },
      ];

      const search: { query: string; firstResult: object }[] = [
        {
          query: "John",
          firstResult: { name: "John Doe", age: 20 },
        },
        {
          query: "Jane",
          firstResult: { name: "Jane Doe", age: 25 },
        },
        {
          query: "Smith",
          firstResult: { name: "John Smith", age: 30 },
        },
        {
          query: "Jane Smith",
          firstResult: { name: "Jane Smith", age: 35 },
        },
      ];

      beforeEach(() => {
        fzearch = new Fzearch(db);
      });

      search.forEach(({ query, firstResult }) => {
        it(`should return ${firstResult.toString()} as the first result when searching for ${query}`, () => {
          expect(fzearch.search(query)[0]).toEqual(firstResult);
        });
      });
    });

    describe("Testing with nested object", () => {
      let fzearch: Fzearch;

      const db = [
        {
          name: "John Doe",
          age: 20,
          address: { city: "New York", son: "Anson" },
        },
        {
          name: "Jane Doe",
          age: 25,
          address: { city: "Los Angeles", son: "John" },
        },
        {
          name: "John Smith",
          age: 30,
          address: { city: "Chicago", son: "Smith" },
        },
        {
          name: "Jane Smith",
          age: 35,
          address: { city: "San Francisco", son: "Jane" },
        },
      ];

      const search: { query: string; firstResult: object }[] = [
        {
          query: "Anson",
          firstResult: {
            name: "John Doe",
            age: 20,
            address: { city: "New York", son: "Anson" },
          },
        },
        {
          query: "Jane",
          firstResult: {
            name: "Jane Smith",
            age: 35,
            address: { city: "San Francisco", son: "Jane" },
          },
        },
        {
          query: "Smith",
          firstResult: {
            name: "John Smith",
            age: 30,
            address: { city: "Chicago", son: "Smith" },
          },
        },
        {
          query: "Jane Smith",
          firstResult: {
            name: "Jane Smith",
            age: 35,
            address: { city: "San Francisco", son: "Jane" },
          },
        },
      ];

      beforeEach(() => {
        fzearch = new Fzearch(db);
      });

      search.forEach(({ query, firstResult }) => {
        it(`should return ${firstResult.toString()} as the first result when searching for ${query}`, () => {
          expect(fzearch.search(query)[0]).toEqual(firstResult);
        });
      });
    });
  });
});

describe("Search with static function", () => {
  describe("Testing with titles", () => {
    const db = [
      "Algorithm of Searching Agentsz",
      "Debounce and Throttle",
      "React Hooks",
      "Persisting State in React",
      "Deep Copy and Shadow Copy in Javascript",
      "Common React Mistakes",
    ];

    const search: { query: string; firstResult: string }[] = [
      {
        query: "React",
        firstResult: "React Hooks",
      },
      {
        query: "React Hooks",
        firstResult: "React Hooks",
      },
      {
        query: "co re mis",
        firstResult: "Common React Mistakes",
      },
      {
        query: "per in",
        firstResult: "Persisting State in React",
      },
    ];

    search.forEach(({ query, firstResult }) => {
      it(`should return ${firstResult} as the first result when searching for ${query}`, () => {
        expect(Fzearch.search(query, db)[0]).toEqual(firstResult);
      });
    });
  });
  describe("Testing with words", () => {
    const db = ["algorithm", "searching", "agents", "debounce", "throttle"];

    const search: { query: string; firstResult: string }[] = [
      {
        query: "searching",
        firstResult: "searching",
      },
      {
        query: "se",
        firstResult: "searching",
      },
      {
        query: "searching agents",
        firstResult: "searching",
      },
    ];

    search.forEach(({ query, firstResult }) => {
      it(`should return ${firstResult} as the first result when searching for ${query}`, () => {
        expect(Fzearch.search(query, db)[0]).toEqual(firstResult);
      });
    });
  });

  describe("Testing with custom function", () => {
    const getPenalty = (dist: number): number => {
      return dist * 20;
    };

    const getSimilarity = (char1: string, char2: string): number => {
      return char1[0] === char2[0] ? 15 : -10;
    };

    const db = ["algorithm", "searching", "agents", "debounce", "throttle"];
    const query = "searchin g agents";

    it("should return 'searching' as the first result", () => {
      expect(
        Fzearch.search(query, db, {
          getPenalty,
          getSimilarity,
          showScore: true,
        })[0],
      ).toEqual({
        item: "searching",
        score: -115,
      });
    });
  });

  describe("Testing maxResults", () => {
    const db = ["algorithm", "searching", "agents", "debounce", "throttle"];
    const query = "searching agents";

    it("should return 2 results", () => {
      expect(
        Fzearch.search(query, db, {
          maxResults: 2,
        }).length,
      ).toEqual(2);
    });
  });

  describe("Testing for case sensitivity", () => {
    const db = ["React", "react", "REACT", "rEaCt"];

    it("should return 'REACT' as the first result if we seach 'REACt", () => {
      expect(Fzearch.search("REACt", db)[0]).toEqual("REACT");
    });

    it("return the correct result based on the caseSensitive option value", () => {
      expect(
        Fzearch.search("REACT", db, {
          caseSensitive: false,
        })[0],
      ).toEqual("React");

      expect(
        Fzearch.search("REACT", db, {
          caseSensitive: true,
        })[0],
      ).toEqual("REACT");
    });
  });

  describe("Testing with Object", () => {
    describe("Testing with simple object with one levet", () => {
      const db = [
        { name: "John Doe", age: 20 },
        { name: "Jane Doe", age: 25 },
        { name: "John Smith", age: 30 },
        { name: "Jane Smith", age: 35 },
      ];

      const search: { query: string; firstResult: object }[] = [
        {
          query: "John",
          firstResult: { name: "John Doe", age: 20 },
        },
        {
          query: "Jane",
          firstResult: { name: "Jane Doe", age: 25 },
        },
        {
          query: "Smith",
          firstResult: { name: "John Smith", age: 30 },
        },
        {
          query: "Jane Smith",
          firstResult: { name: "Jane Smith", age: 35 },
        },
      ];

      search.forEach(({ query, firstResult }) => {
        it(`should return ${firstResult.toString()} as the first result when searching for ${query}`, () => {
          expect(Fzearch.search(query, db)[0]).toEqual(firstResult);
        });
      });
    });

    describe("Testing with nested object", () => {
      const db = [
        {
          name: "John Doe",
          age: 20,
          address: { city: "New York", son: "Anson" },
        },
        {
          name: "Jane Doe",
          age: 25,
          address: { city: "Los Angeles", son: "John" },
        },
        {
          name: "John Smith",
          age: 30,
          address: { city: "Chicago", son: "Smith" },
        },
        {
          name: "Jane Smith",
          age: 35,
          address: { city: "San Francisco", son: "Jane" },
        },
      ];

      const search: { query: string; firstResult: object }[] = [
        {
          query: "Anson",
          firstResult: {
            name: "John Doe",
            age: 20,
            address: { city: "New York", son: "Anson" },
          },
        },
        {
          query: "Jane",
          firstResult: {
            name: "Jane Smith",
            age: 35,
            address: { city: "San Francisco", son: "Jane" },
          },
        },
        {
          query: "Smith",
          firstResult: {
            name: "John Smith",
            age: 30,
            address: { city: "Chicago", son: "Smith" },
          },
        },
        {
          query: "Jane Smith",
          firstResult: {
            name: "Jane Smith",
            age: 35,
            address: { city: "San Francisco", son: "Jane" },
          },
        },
      ];

      search.forEach(({ query, firstResult }) => {
        it(`should return ${firstResult.toString()} as the first result when searching for ${query}`, () => {
          expect(Fzearch.search(query, db)[0]).toEqual(firstResult);
        });
      });
    });

    describe("Testing with custom keys", () => {
      const db = [
        {
          name: "John Doe",
          age: 20,
          address: { city: "New York", son: "Anson" },
        },
        {
          name: "Jane Doe",
          age: 25,
          address: { city: "Los Angeles", son: "John" },
        },
        {
          name: "John Smith",
          age: 30,
          address: { city: "Chicago", son: "Smith" },
        },
        {
          name: "Anson Smith",
          age: 35,
          address: { city: "San Francisco", son: "Jane" },
        },
      ];

      const search: { query: string; firstResult: object }[] = [
        {
          query: "Anson",
          firstResult: db[0],
        },
        {
          query: "Jane",
          firstResult: db[3],
        },
        {
          query: "Smith",
          firstResult: db[2],
        },
        {
          query: "San",
          firstResult: db[3],
        },
      ];

      search.forEach(({ query, firstResult }) => {
        it(`should return ${JSON.stringify(firstResult)} as the first result when searching for ${query}`, () => {
          expect(
            Fzearch.search(query, db, {
              keys: ["address.city", "address.son"],
            })[0],
          ).toEqual(firstResult);
        });
      });
    });
  });

  describe("Test Fzearch db function", () => {
    let fzearch: Fzearch;

    describe("Test setDB", () => {
      describe("Test setDB with object", () => {
        const db = { name: "John Doe", age: 20 };

        beforeEach(() => {
          fzearch = new Fzearch([]);
        });

        it("should set db as an array of object", () => {
          expect(fzearch.search("Jane Doe")).toEqual([]);
          fzearch.setDB(db);
          expect(fzearch.search("John Doe")[0]).toEqual(db);
        });
      });
      describe("Test setDB with array of object", () => {
        const db = [
          { name: "John Doe", age: 20 },
          { name: "Jane Doe", age: 25 },
        ];

        beforeEach(() => {
          fzearch = new Fzearch([]);
        });

        it("should set db as an array of object", () => {
          expect(fzearch.search("Jane Doe")).toEqual([]);
          fzearch.setDB(db);
          expect(fzearch.search("Jane Doe")).toEqual(db.reverse());
        });
      });

      describe("Test setDB with array of string", () => {
        const db = ["John Doe", "Jane Doe"];

        beforeEach(() => {
          fzearch = new Fzearch([]);
        });

        it("should set db as an array of string", () => {
          expect(fzearch.search("Jane Doe")).toEqual([]);
          fzearch.setDB(db);
          expect(fzearch.search("Jane Doe")).toEqual(db.reverse());
        });
      });
    });

    describe("Test addDB", () => {
      describe("Test addDB with empty db adding object", () => {
        const db = { name: "John Doe", age: 20 };

        beforeEach(() => {
          fzearch = new Fzearch([]);
        });

        it("should set db as an array of object", () => {
          expect(fzearch.search("Jane Doe")).toEqual([]);
          fzearch.addDB(db);
          expect(fzearch.search("John Doe")[0]).toEqual(db);
          // check if deep copy
          expect(fzearch.search("John Doe")[0]).not.toBe(db);
        });
      });

      describe("Test addDB with empty db adding string", () => {
        const db = "John Doe";

        beforeEach(() => {
          fzearch = new Fzearch([]);
        });

        it("should set db as an array of string", () => {
          expect(fzearch.search("Jane Doe")).toEqual([]);
          fzearch.addDB(db);
          expect(fzearch.search("John Doe")[0]).toEqual(db);
        });
      });

      describe("Test addDB with string db adding object", () => {
        const db = { name: "John Doe", age: 20 };

        beforeEach(() => {
          fzearch = new Fzearch(["Jane Doe"]);
        });

        it("should set db as an array of object", () => {
          expect(fzearch.search("John Doe")[0]).toEqual("Jane Doe");
          fzearch.addDB(db);
          expect(fzearch.search("John Doe")[0]).toEqual(db);
        });
      });

      describe("Test addDB with object db adding string", () => {
        const db = "John Doe";

        beforeEach(() => {
          fzearch = new Fzearch([{ name: "Jane Doe", age: 25 }]);
        });

        it("should set db as an array of string", () => {
          expect(fzearch.search("John Doe")[0]).toEqual({
            name: "Jane Doe",
            age: 25,
          });
          fzearch.addDB(db);
          expect(fzearch.search("John Doe")[0]).toEqual(db);
        });
      });

      describe("Test addDB with object db adding object", () => {
        const db = { name: "John Doe", age: 20 };

        beforeEach(() => {
          fzearch = new Fzearch([{ name: "Jane Doe", age: 25 }]);
        });

        it("should set db as an array of object", () => {
          expect(fzearch.search("John Doe")[0]).toEqual({
            name: "Jane Doe",
            age: 25,
          });
          fzearch.addDB(db);
          expect(fzearch.search("John Doe")[0]).toEqual(db);
        });
      });

      describe("Test addDB with string db adding string", () => {
        const db = "John Doe";

        beforeEach(() => {
          fzearch = new Fzearch(["Jane Doe"]);
        });

        it("should set db as an array of string", () => {
          expect(fzearch.search("John Doe")[0]).toEqual("Jane Doe");
          fzearch.addDB(db);
          expect(fzearch.search("John Doe")[0]).toEqual(db);
        });
      });
    });
  });
});
