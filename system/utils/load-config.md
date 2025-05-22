```python
def load_config(name, default="{}"):
    path = os.path.join(BASE_PATH, "config", f"{name}.json")
    if os.path.isfile(path):
        return json.load(open(path))
    return json.loads(default)
```
