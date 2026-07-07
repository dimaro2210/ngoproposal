import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ngo_project.settings')
django.setup()

from ngo_api.models import Program

def populate():
    programs = [
        {
            'title': 'Clean Water Outreach',
            'description': 'Providing sustainable clean boreholes and filtration systems to dry community areas.',
            'target_amount': 5000000.00,
            'current_amount': 1500000.00,
            'status': 'active',
            'image_url': 'https://images.unsplash.com/photo-1541944743827-e04aa6427c33?q=80&w=400'
        },
        {
            'title': 'Nonprofit School Kit Campaign',
            'description': 'Distributing educational kits containing textbooks, writing pads, bags, and uniforms to students.',
            'target_amount': 3000000.00,
            'current_amount': 2200000.00,
            'status': 'active',
            'image_url': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=400'
        },
        {
            'title': 'Medical Outreach & Health Camp',
            'description': 'Deploying volunteer doctors and medical supplies to check, treat, and counsel remote rural patient zones.',
            'target_amount': 8000000.00,
            'current_amount': 4500000.00,
            'status': 'active',
            'image_url': 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400'
        }
    ]

    for p in programs:
        Program.objects.get_or_create(
            title=p['title'],
            defaults={
                'description': p['description'],
                'target_amount': p['target_amount'],
                'current_amount': p['current_amount'],
                'status': p['status'],
                'image_url': p['image_url']
            }
        )
    print("Default program campaigns populated successfully!")

if __name__ == '__main__':
    populate()
