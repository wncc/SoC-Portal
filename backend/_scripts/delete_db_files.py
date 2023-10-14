import os
import shutil
from pathlib import Path

# import os
# from django.core.management import call_command


def delete_migration_files(app_name):
    migrations_folder = Path(app_name) / "migrations"

    # Delete all files except '__init__.py'
    for file in migrations_folder.iterdir():
        if file.name == "__pycache__":
            shutil.rmtree(file.resolve())
        elif file.name != "__init__.py":
            file.unlink()


def delete_sqlite_db(db_path):
    db_path = Path(db_path)
    if db_path.exists():
        db_path.unlink()


def confirm_action():
    confirmation = input(
        "This action will hard-reset all your migrations and delete your database. Are you sure you want to continue? (yes/no): "
    ).lower()
    return confirmation == "yes"


if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
    if not confirm_action():
        print("Script execution aborted.")
        exit()

    # Find Django app names in the current project directory
    django_apps = [
        path.parent.parent.name for path in Path(".").glob("**/migrations/__init__.py")
    ]

    for app_name in django_apps:
        # Delete migration files for each app
        delete_migration_files(app_name)
        print(f"Deleted migrations in {app_name}")

    # Delete SQLite DB using a relative path
    db_path = "db.sqlite3"  # Relative path from the current working directory
    delete_sqlite_db(db_path)

    # call_command("makemigrations")
    # call_command("migrate")
