[![](https://img.shields.io/badge/mino_1.0.0-passing-green)](https://github.com/gongahkia/mino/releases/tag/1.0.0)
[![](https://img.shields.io/badge/mino_2.0.0-passing-light_green)](https://github.com/gongahkia/mino/releases/tag/2.0.0)

# `Mino`

A minimal Voxel Modeling, Visualization and Animation tool with real-time rendering and a scriptable API, served as a [CLI tool](#cli-1) and [Web App](#web-app-1).

## Stack

* *Script*: [Python](https://www.python.org/)
* *Frontend*: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [HTML Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
* *Backend*: [Node.js](https://nodejs.org/en), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* *Dependencies*: [Pygame](https://www.pygame.org/news), [NumPy](https://numpy.org/)
* *Package*: [Docker](https://www.docker.com/)
* *Test*: [Pytest](https://docs.pytest.org/en/stable/)

## Usage

### CLI

The below instructions are for running `Mino` CLI on your client machine.

1. Execute the below.

```console
$ git clone https://github.com/gongahkia/Mino && cd Mino/cli
```

2. Build and run a Docker Image for [Production](./cli/Dockerfile).

```console
$ docker build -t mino-prod -f Dockerfile .
$ docker run --rm -it -p 8000:8000 mino-prod
```

3. Build and run a Docker Image for [Development](./cli/Dockerfile.dev).

```console
$ docker build -t mino-dev -f Dockerfile.dev .
$ docker run --rm -it -v $(pwd):/app -p 8000:8000 mino-dev
```

4. Build and run [Unit Tests](./cli/tests/).

```console
$ docker build -t mino-dev -f Dockerfile.dev .
$ docker run --rm -it -v $(pwd):/app mino-dev pytest tests/
```

### Web App

1. Execute the below.

```console
$ git clone https://github.com/gongahkia/Mino && cd Mino/web
```

2. Build and run a Docker Image for [both](./web/docker-compose.yml) the Frontend and the Backend.

```console
$ docker-compose build
$ docker-compose up
$ docker-compose up --build
```

3. Access the [Frontend](./web/frontend/) at [localhost:3000](http://localhost:3000) and the [Backend](./web/backend/) at [localhost:4000](http://localhost:4000).

## Architecture

### CLI

```mermaid
flowchart TD
  subgraph Main_Entry["main.py (Entry Point)"]
    MainApp["main.py"]
  end

  subgraph Mino_Package["mino/ (Python Package)"]
    subgraph Core_Module["core.py"]
      Voxel["Voxel (class)"]
      VoxelModel["VoxelModel (class)"]
    end

    subgraph Renderer_Module["renderer.py"]
      Camera["Camera (class)"]
      VoxelRenderer["VoxelRenderer (class)"]
    end

    subgraph API_Module["api.py"]
      MinoModel["MinoModel (class)"]
    end

    subgraph Exporters_Pkg["exporters/"]
      ExportersInit["__init__.py"]
      OBJExporter["obj_exporter.py (export_obj)"]
      STLExporter["stl_exporter.py (export_stl)"]
    end

    subgraph Utils_Module["utils.py"]
      SaveJSON["save_json"]
      LoadJSON["load_json"]
      Clamp["clamp"]
      Lerp["lerp"]
      RGB2Hex["rgb_to_hex"]
      Hex2RGB["hex_to_rgb"]
      Distance3D["distance3d"]
    end

    subgraph UI_Module["ui.py"]
      ColorPicker["ColorPicker (class)"]
      SimpleToolbar["SimpleToolbar (class)"]
    end
  end

  subgraph Examples["examples/"]
    SimpleCube["simple_cube.py"]
    AnimationDemo["animation_demo.py"]
  end

  subgraph Tests["tests/"]
    TestCore["test_core.py"]
    TestRenderer["test_renderer.py"]
    TestExporters["test_exporters.py"]
  end

  subgraph Assets["assets/icons/"]
    Icons["(icon assets)"]
  end

  Requirements["requirements.txt"]

  %% Relationships
  MainApp --> MinoModel
  MainApp --> ColorPicker
  MainApp --> SimpleToolbar
  MainApp --> Requirements

  MinoModel --> VoxelModel
  MinoModel --> VoxelRenderer
  MinoModel --> OBJExporter
  MinoModel --> STLExporter

  VoxelModel --> Voxel

  VoxelRenderer --> Camera
  VoxelRenderer --> VoxelModel

  OBJExporter --> VoxelModel
  STLExporter --> VoxelModel

  ColorPicker --> Clamp
  SimpleToolbar --> Clamp

  VoxelModel --> SaveJSON
  VoxelModel --> LoadJSON

  SimpleCube --> MinoModel
  AnimationDemo --> MinoModel

  TestCore --> Voxel
  TestCore --> VoxelModel

  TestRenderer --> VoxelModel
  TestRenderer --> VoxelRenderer
  TestRenderer --> Camera

  TestExporters --> VoxelModel
  TestExporters --> OBJExporter
  TestExporters --> STLExporter

  MainApp -.-> Icons
  UI_Module -.-> Icons

  %% Labels for clarity
  MainApp -- "uses" --> MinoModel
  MainApp -- "uses" --> ColorPicker
  MainApp -- "uses" --> SimpleToolbar
  MainApp -- "depends on" --> Requirements

  MinoModel -- "wraps" --> VoxelModel
  MinoModel -- "wraps" --> VoxelRenderer
  MinoModel -- "exports to" --> OBJExporter
  MinoModel -- "exports to" --> STLExporter

  VoxelModel -- "contains" --> Voxel

  VoxelRenderer -- "has" --> Camera
  VoxelRenderer -- "renders" --> VoxelModel

  OBJExporter -- "serializes" --> VoxelModel
  STLExporter -- "serializes" --> VoxelModel

  ColorPicker -- "uses" --> Clamp
  SimpleToolbar -- "uses" --> Clamp

  VoxelModel -- "calls" --> SaveJSON
  VoxelModel -- "calls" --> LoadJSON

  SimpleCube -- "demonstrates" --> MinoModel
  AnimationDemo -- "demonstrates" --> MinoModel

  TestCore -- "tests" --> Voxel
  TestCore -- "tests" --> VoxelModel

  TestRenderer -- "tests" --> VoxelModel
  TestRenderer -- "tests" --> VoxelRenderer
  TestRenderer -- "tests" --> Camera

  TestExporters -- "tests" --> VoxelModel
  TestExporters -- "tests" --> OBJExporter
  TestExporters -- "tests" --> STLExporter

  MainApp -.-> Icons
  UI_Module -.-> Icons
```

### Web App

```Mermaid
flowchart TD
  %% --- FRONTEND ---
  subgraph Web_Frontend["Frontend (React/TypeScript)"]
    AppComponent["App.tsx (Main UI/App State)"]

    subgraph UI_Components["components/"]
      Canvas3D["Canvas3D.tsx (3D Voxel Viewer)"]
      ColorPicker["ColorPicker.tsx"]
      Toolbar["Toolbar.tsx"]
    end

    subgraph Utilities["utils/"]
      FrontHelpers["helpers.ts (Color/Helpers)"]
    end

    subgraph Services["services/"]
      ApiClient["apiClient.ts (REST Client)"]
    end

    subgraph Workers["workers/"]
      CompressWorker["compressionWorker.ts (RLE/SVO Workers)"]
    end

    AppComponent --> Canvas3D
    AppComponent --> ColorPicker
    AppComponent --> Toolbar
    AppComponent --> ApiClient
    AppComponent --> CompressWorker
    Canvas3D --> FrontHelpers
    Toolbar --> ColorPicker
    AppComponent --> FrontHelpers
  end

  %% --- BACKEND ---
  subgraph Backend_API["Backend (Node.js/Express/TypeScript)"]
    IndexTs["index.ts (Express Server)"]
    Routes["routes.ts (REST API Endpoints)"]

    subgraph Core["core/"]
      Voxel["voxel.ts (Voxel Type)"]
      VoxelModel["voxelModel.ts (VoxelModel)"]
      Compression["compression.ts (RLE/SVO)"]
    end

    subgraph Exporters["exporters/"]
      ObjExporter["objExporter.ts"]
      StlExporter["stlExporter.ts"]
    end

    subgraph Utils["utils/"]
      MathUtils["math.ts"]
    end

    subgraph Scripts["scripts/"]
      PluginSystem["pluginSystem.ts (Plugins)"]
    end

    IndexTs --> Routes
    Routes --> VoxelModel
    Routes --> Compression
    Routes --> ObjExporter
    Routes --> StlExporter
    Routes --> PluginSystem
    VoxelModel --> Voxel
    VoxelModel --> MathUtils
    Compression --> Voxel
    ObjExporter --> VoxelModel
    StlExporter --> VoxelModel
    PluginSystem --> VoxelModel
  end

  %% --- DATA EXCHANGE ---
  Web_Frontend -- "REST API /api/*" --> Backend_API
  ApiClient -- "HTTP" --> Routes
  CompressWorker -- "offload compress" --> AppComponent

  %% --- TESTING & ASSETS ---
  subgraph Tests_and_Public["Testing & Public"]
    FE_Tests["frontend/tests/ (Canvas3D.test.tsx, ... )"]
    BE_Tests["backend/tests/ (core.test.ts, ... )"]
    IndexHtml["frontend/public/index.html"]
    Assets["(icons, css, etc.)"]
  end
  AppComponent -.-> FE_Tests
  VoxelModel -.-> BE_Tests
  Web_Frontend -.-> IndexHtml
  FrontHelpers -.-> Assets

  %% --- RELATIONSHIPS CLARITY ---
  AppComponent -- "uses" --> UI_Components
  VoxelModel -- "uses" --> Core
  Routes -- "calls" --> Core
  Routes -- "calls" --> Exporters
  Routes -- "runs" --> Scripts
```

## Reference

The name `Mino` is shorthand for "Minus One", loosely referring to `Mino`'s employment of [Voxel Coordinate Compression](https://eisenwave.github.io/voxel-compression-docs/), specifically [SVO](https://en.wikipedia.org/wiki/Sparse_voxel_octree) and [RLE](https://en.wikipedia.org/wiki/Run-length_encoding). `Mino` also happens to be one character away from "Mini", which is a [happy coincidence](https://www.collinsdictionary.com/dictionary/english/happy-coincidence).
