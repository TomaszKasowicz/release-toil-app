# release-toil-app

This repository demonstrates various approaches to using conditional environment variables in GitHub Actions workflows.

## Conditional Environment Variables in GitHub Actions

### Question: Can I use if statements when defining "env" within job?

**Short Answer:** You cannot use `if` statements directly in the job-level `env` block, but there are several effective alternatives for conditional environment variables.

### Approaches for Conditional Environment Variables

#### 1. Conditional Expressions in Environment Values

You can use conditional expressions directly within environment variable values:

```yaml
jobs:
  my-job:
    runs-on: ubuntu-latest
    env:
      # Ternary-like conditional expressions
      DATABASE_URL: ${{ inputs.environment == 'production' && 'prod-db-url' || 'dev-db-url' }}
      DEBUG_MODE: ${{ inputs.environment != 'production' }}
      API_ENDPOINT: ${{ github.ref == 'refs/heads/main' && 'https://api.prod.com' || 'https://api.dev.com' }}
```

#### 2. Step-Level Conditional Environment Variables

Set environment variables conditionally using step-level `if` conditions:

```yaml
steps:
  - name: Set production variables
    if: inputs.environment == 'production'
    run: |
      echo "DATABASE_URL=prod-database.com" >> $GITHUB_ENV
      echo "LOG_LEVEL=error" >> $GITHUB_ENV
      
  - name: Set development variables
    if: inputs.environment == 'development'
    run: |
      echo "DATABASE_URL=dev-database.com" >> $GITHUB_ENV
      echo "LOG_LEVEL=debug" >> $GITHUB_ENV
```

#### 3. Matrix Strategy for Multiple Conditional Configurations

Use matrix strategies to define different environment configurations:

```yaml
strategy:
  matrix:
    environment: [dev, staging, prod]
    include:
      - environment: dev
        database_url: dev-db.com
        log_level: debug
      - environment: prod
        database_url: prod-db.com
        log_level: error

env:
  DATABASE_URL: ${{ matrix.database_url }}
  LOG_LEVEL: ${{ matrix.log_level }}
```

#### 4. Complex Conditional Logic with JSON

Handle complex configurations using `fromJSON`:

```yaml
env:
  CONFIG: ${{ fromJSON('{"dev":{"api":"dev-api.com"},"prod":{"api":"prod-api.com"}}')[inputs.environment] }}

steps:
  - name: Set from JSON config
    run: |
      echo "API_URL=${{ fromJSON(env.CONFIG).api }}" >> $GITHUB_ENV
```

### Examples in This Repository

- **`conditional-env-examples.yml`**: Comprehensive examples of all approaches
- **`journey-release-dispatch.yml`**: Practical implementation in an existing workflow

### Key Takeaways

1. **Job-level `env`**: Use conditional expressions for simple conditions
2. **Step-level**: Use `if` conditions for complex logic
3. **Matrix strategy**: Use for multiple environment configurations
4. **JSON configurations**: Use for complex nested configurations
5. **Git-based conditions**: Use `github.ref` for branch-based logic

### Common Use Cases

- Environment-specific configurations (dev/staging/prod)
- Feature flag management
- Branch-based deployment settings
- Event type-specific variables
- Conditional secret usage