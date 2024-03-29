# Generated by Django 2.1.7 on 2019-03-24 18:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20190324_2101'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='series',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.SET_DEFAULT, related_name='event', to='api.Series'),
        ),
        migrations.AlterField(
            model_name='series',
            name='species',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.SET_DEFAULT, related_name='species', to='api.Species'),
        ),
    ]
