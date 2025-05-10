import click
from flask.cli import with_appcontext
from . import db
from .models.user import User

@click.command()
@with_appcontext
def init_db():
    """Initialize the database."""
    db.create_all()
    click.echo('Initialized the database.')

@click.command()
@with_appcontext
def drop_db():
    """Drop all database tables."""
    if click.confirm('Are you sure you want to drop all tables?'):
        db.drop_all()
        click.echo('Dropped all tables.')

@click.command()
@with_appcontext
def seed_db():
    """Seed the database with sample data."""
    # Add sample users
    users = [
        User(username='john_doe', email='john@example.com'),
        User(username='jane_doe', email='jane@example.com'),
    ]
    
    for user in users:
        db.session.add(user)
    
    try:
        db.session.commit()
        click.echo('Added sample users to the database.')
    except Exception as e:
        db.session.rollback()
        click.echo(f'Error seeding database: {str(e)}') 