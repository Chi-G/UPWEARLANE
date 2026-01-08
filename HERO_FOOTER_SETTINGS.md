# Hero and Footer Settings Management

## Overview
The landing page hero and footer sections are now dynamically loaded from the database, allowing you to easily update content without modifying code.

## Database Tables

### Hero Settings (`hero_settings`)
Controls the hero section of the landing page.

**Fields:**
- `title` - Main headline text
- `subtitle` - Subtitle/description text (optional)
- `badge` - Badge text above title (optional)
- `background_image` - Background image path (optional)
- `hero_image` - Hero image path (optional)
- `stats` - JSON array of stats: `[{"value": "50K+", "label": "Happy Customers"}]`
- `is_active` - Whether this setting is active (boolean)

### Footer Settings (`footer_settings`)
Controls the footer section of the landing page.

**Fields:**
- `company_description` - Company description text
- `social_links` - JSON array: `[{"name": "Facebook", "url": "...", "icon": "Facebook"}]`
- `quick_links` - JSON array: `[{"name": "About Us", "url": "/about"}]`
- `contact_address` - Contact address
- `contact_phone` - Contact phone number
- `contact_email` - Contact email
- `trust_badges` - JSON array: `["SSL Secure", "PCI Compliant"]`
- `legal_links` - JSON array: `[{"name": "Privacy Policy", "url": "/privacy"}]`
- `is_active` - Whether this setting is active (boolean)

## Usage with Filament Admin Panel

Once you set up Filament, you can create resources to manage these settings:

### Example: Hero Settings Resource

```php
// app/Filament/Resources/HeroSettingResource.php
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Repeater;

public static function form(Form $form): Form
{
    return $form->schema([
        TextInput::make('title')->required(),
        Textarea::make('subtitle'),
        TextInput::make('badge'),
        FileUpload::make('background_image')->image(),
        FileUpload::make('hero_image')->image(),
        Repeater::make('stats')->schema([
            TextInput::make('value')->required(),
            TextInput::make('label')->required(),
        ]),
        Toggle::make('is_active')->default(true),
    ]);
}
```

## Manual Database Updates

You can also update settings using Tinker:

```bash
# Update hero title
php artisan tinker --execute="App\Models\HeroSetting::first()->update(['title' => 'New Title']);"

# Update footer company description
php artisan tinker --execute="App\Models\FooterSetting::first()->update(['company_description' => 'New description']);"

# Add a new social link
php artisan tinker --execute="
\$footer = App\Models\FooterSetting::first();
\$links = \$footer->social_links;
\$links[] = ['name' => 'TikTok', 'url' => 'https://tiktok.com/@upwearlane', 'icon' => 'TiktokIcon'];
\$footer->update(['social_links' => \$links]);
"
```

## Features

✅ **Single Active Setting**: Only one hero and one footer setting can be active at a time
✅ **Fallback Values**: If no settings exist in DB, the page will use default hardcoded values
✅ **JSON Flexibility**: Stats, social links, and other arrays are stored as JSON for easy manipulation
✅ **Image Paths**: Store image paths that reference the public directory

## Next Steps

1. Install Filament Admin Panel
2. Create HeroSettingResource and FooterSettingResource
3. Manage all settings through the admin panel UI
4. Consider adding image upload functionality with storage integration
