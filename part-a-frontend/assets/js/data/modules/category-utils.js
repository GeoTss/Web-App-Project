class Category {
    constructor(name, color, id) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
}

export const CategoryLookup = {
    SYSTEMS_PROGRAMMING: 0,
    GRAPHICS_PROGRAMMING: 1,
    APP_DEVELOPMENT: 2,
    WEB_DEVELOPMENT: 3,
    DATA_SCIENCE: 4,
    NETWORKS: 5,
    CYBERSECURITY: 6,
    ARTIFICIAL_INTELLIGENCE: 7,
    CLOUD_COMPUTING: 8,
    GAME_DEVELOPMENT: 9,
    EMBEDDED_SYSTEMS: 10,
    DATABASE_MANAGEMENT: 11,
    DEVOPS: 12,
    QUANTUM_COMPUTING: 13,
    BLOCKCHAIN: 14
};

export const category_t = {
    [CategoryLookup.SYSTEMS_PROGRAMMING]: new Category("Systems Programming", "#708090", CategoryLookup.SYSTEMS_PROGRAMMING),
    [CategoryLookup.GRAPHICS_PROGRAMMING]: new Category("Graphics Programming", "#DA70D6", CategoryLookup.GRAPHICS_PROGRAMMING),
    [CategoryLookup.APP_DEVELOPMENT]: new Category("App Development", "#FF8C00", CategoryLookup.APP_DEVELOPMENT),
    [CategoryLookup.WEB_DEVELOPMENT]: new Category("Web Development", "#2E8B57", CategoryLookup.WEB_DEVELOPMENT),
    [CategoryLookup.DATA_SCIENCE]: new Category("Data Science", "#20B2AA", CategoryLookup.DATA_SCIENCE),
    [CategoryLookup.NETWORKS]: new Category("Networks", "#4169E1", CategoryLookup.NETWORKS),
    [CategoryLookup.CYBERSECURITY]: new Category("Cybersecurity", "#8B0000", CategoryLookup.CYBERSECURITY),
    [CategoryLookup.ARTIFICIAL_INTELLIGENCE]: new Category("Artificial Intelligence", "#9932CC", CategoryLookup.ARTIFICIAL_INTELLIGENCE),
    [CategoryLookup.CLOUD_COMPUTING]: new Category("Cloud Computing", "#00BFFF", CategoryLookup.CLOUD_COMPUTING),
    [CategoryLookup.GAME_DEVELOPMENT]: new Category("Game Development", "#FF1493", CategoryLookup.GAME_DEVELOPMENT),
    [CategoryLookup.EMBEDDED_SYSTEMS]: new Category("Embedded Systems", "#556B2F", CategoryLookup.EMBEDDED_SYSTEMS),
    [CategoryLookup.DATABASE_MANAGEMENT]: new Category("Databases", "#4682B4", CategoryLookup.DATABASE_MANAGEMENT),
    [CategoryLookup.DEVOPS]: new Category("DevOps & Automation", "#FF4500", CategoryLookup.DEVOPS),
    [CategoryLookup.QUANTUM_COMPUTING]: new Category("Quantum Computing", "#4B0082", CategoryLookup.QUANTUM_COMPUTING),
    [CategoryLookup.BLOCKCHAIN]: new Category("Blockchain & Web3", "#DAA520", CategoryLookup.BLOCKCHAIN)
};

function initializeGraph() {
    const graph = {};

    Object.keys(category_t).forEach((key) => {
        graph[key] = [];
    });

    function connectEdge(src, dest) {
        graph[src].push(dest);
        graph[dest].push(src);
    }

    connectEdge(CategoryLookup.SYSTEMS_PROGRAMMING, CategoryLookup.EMBEDDED_SYSTEMS);
    connectEdge(CategoryLookup.SYSTEMS_PROGRAMMING, CategoryLookup.NETWORKS);
    connectEdge(CategoryLookup.SYSTEMS_PROGRAMMING, CategoryLookup.CYBERSECURITY);

    connectEdge(CategoryLookup.WEB_DEVELOPMENT, CategoryLookup.APP_DEVELOPMENT);
    connectEdge(CategoryLookup.WEB_DEVELOPMENT, CategoryLookup.DEVOPS);
    connectEdge(CategoryLookup.DEVOPS, CategoryLookup.CLOUD_COMPUTING);
    connectEdge(CategoryLookup.CLOUD_COMPUTING, CategoryLookup.NETWORKS);

    connectEdge(CategoryLookup.DATA_SCIENCE, CategoryLookup.ARTIFICIAL_INTELLIGENCE);
    connectEdge(CategoryLookup.DATA_SCIENCE, CategoryLookup.DATABASE_MANAGEMENT);

    connectEdge(CategoryLookup.GRAPHICS_PROGRAMMING, CategoryLookup.GAME_DEVELOPMENT);
    connectEdge(CategoryLookup.GAME_DEVELOPMENT, CategoryLookup.EMBEDDED_SYSTEMS);

    connectEdge(CategoryLookup.ARTIFICIAL_INTELLIGENCE, CategoryLookup.QUANTUM_COMPUTING);
    connectEdge(CategoryLookup.SYSTEMS_PROGRAMMING, CategoryLookup.QUANTUM_COMPUTING);
    connectEdge(CategoryLookup.CYBERSECURITY, CategoryLookup.BLOCKCHAIN);

    return graph;
}

export const similarityGraph = initializeGraph();