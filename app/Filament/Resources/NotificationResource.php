<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NotificationResource\Pages;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\Placeholder;
use Filament\Schemas\Components\Section;
use Illuminate\Notifications\DatabaseNotification; 
use Illuminate\Support\Str;

class NotificationResource extends Resource
{
    protected static ?string $model = DatabaseNotification::class;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static ?string $navigationLabel = 'Notification History';

    protected static ?string $pluralLabel = 'Notification History'; 

    protected static \UnitEnum|string|null $navigationGroup = 'Frontend Settings';

    protected static ?int $navigationSort = 10;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Section::make()
                    ->schema([
                        Placeholder::make('type')
                            ->content(fn ($record) => Str::afterLast($record->type, '\\')),
                        Placeholder::make('title')
                            ->content(fn ($record) => $record->data['title'] ?? 'N/A'),
                        Placeholder::make('body')
                            ->content(fn ($record) => new \Illuminate\Support\HtmlString($record->data['body'] ?? 'N/A')),
                        Placeholder::make('created_at')
                            ->content(fn ($record) => $record->created_at?->diffForHumans()),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\IconColumn::make('read_at')
                    ->label('Read')
                    ->boolean()
                    ->getStateUsing(fn ($record) => $record->read_at !== null),
                Tables\Columns\TextColumn::make('data.title')
                    ->label('Title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('data.body')
                    ->label('Message')
                    ->limit(50)
                    ->html(),
            ])
            ->filters([
                Tables\Filters\Filter::make('unread')
                    ->query(fn ($query) => $query->whereNull('read_at')),
            ])
            ->actions([
                \Filament\Actions\ViewAction::make(),
                \Filament\Actions\Action::make('markAsRead')
                    ->icon('heroicon-o-check')
                    ->action(fn ($record) => $record->markAsRead())
                    ->hidden(fn ($record) => $record->read_at !== null),
            ])
            ->bulkActions([
                \Filament\Actions\DeleteBulkAction::make(),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListNotifications::route('/'),
            'view' => Pages\ViewNotification::route('/{record}'),
        ];
    }

    public static function canCreate(): bool
    {
        return false;
    }
}
